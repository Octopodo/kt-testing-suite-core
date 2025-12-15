import { TestReporter } from "./reporters/types";
import { ConsoleReporter } from "./reporters/ConsoleReporter";
import { Suite } from "./types";
import { getSuites } from "./describe";
export class TestRunner {
    private passedTests = 0;
    private failedTests = 0;
    private reporter: TestReporter;
    private filter?: string;

    constructor(reporter?: TestReporter, filter?: string) {
        this.reporter = reporter || new ConsoleReporter();
        this.filter = filter;
    }

    /**
     * Executes the provided test suites.
     * @param suites - An array of test suites to run.
     */
    run(suites: Suite[]): void {
        this.reporter.onStart();
        for (const suite of suites) {
            this.runSuite(suite, '');
        }
        this.reporter.onFinished({
            passed: this.passedTests,
            failed: this.failedTests,
            total: this.passedTests + this.failedTests
        });
    }

    private runSuite(suite: Suite, parentDescription: string): void {
        const currentDescription = parentDescription 
            ? `${parentDescription} ${suite.description}`
            : suite.description;

        // Check if any test in this suite or children matches the filter
        // If strict filtering is needed (skip entire suites), we could pre-check here.
        // For now, we traverse and filter at the test level, but we still report suite entry
        // only if we are actually going to run something? 
        // Current behavior: We report suite start regardless. 
        // Optimization: In the future, peek ahead to see if suite has matching tests.
        
        this.reporter.onSuiteStart(suite);

        // Run hooks only if we execute tests? 
        // Standard Jest behavior: describe blocks always run, it's the 'it' blocks that get skipped.
        // But matching 'describe' usually means "run all tests likely".
        // Let's implement simple string matching on the full test name.

        // Ejecutar beforeAll hooks
        this.runSuiteHooks(suite, 'beforeAll', true);

        try {
            for (const test of suite.tests) {
                const fullTestName = `${currentDescription} ${test.name}`;
                
                if (this.shouldSkip(fullTestName)) {
                     // Optionally report skipped tests?
                     // For now, just silently skip or report as skipped
                     // If we want accurate stats, we should report them as skipped.
                     // But often grep means "pretend others don't exist".
                     // Let's go with "pretend others don't exist" to keep output clean 
                     // OR match Jest's "-t" which just runs matches.
                     continue; 
                }

                this.reporter.onTestStart(test);
                let testStatus: 'passed' | 'failed' = 'passed';
                let testError: { message: string, fileName?: string, line?: number } | undefined;

                try {
                    this.runHooks(suite, 'beforeEach', true);
                    test.fn();
                    this.passedTests++;
                    testStatus = 'passed';
                } catch (e: any) {
                    this.failedTests++;
                    testStatus = 'failed';
                    testError = {
                        message: e.message,
                        fileName: e.fileName,
                        line: e.line
                    };
                } finally {
                    this.runHooks(suite, 'afterEach', false);
                    this.reporter.onTestEnd(test, {
                        name: test.name,
                        status: testStatus,
                        error: testError
                    });
                }
            }

            if (suite.children && suite.children.length > 0) {
                for (const childSuite of suite.children) {
                    this.runSuite(childSuite, currentDescription);
                }
            }
        } finally {
            this.runSuiteHooks(suite, 'afterAll', false);
            this.reporter.onSuiteEnd(suite);
        }
    }

    private shouldSkip(fullName: string): boolean {
        if (!this.filter) return false;
        // Simple case-insensitive substring match
        return fullName.toLowerCase().indexOf(this.filter.toLowerCase()) === -1;
    }

    /**
     * Ejecuta hooks de suite específicos (beforeAll/afterAll)
     * @param suite Suite actual
     * @param hookType Tipo de hook
     * @param fromParentToChild Orden de ejecución
     */
    private runSuiteHooks(suite: Suite, hookType: keyof Suite, fromParentToChild: boolean): void {
        const hook = suite[hookType] as (() => void) | undefined;
        if (hook) {
            try {
                hook();
            } catch (e: any) {
                $.writeln(`    ⚠️ Error in ${hookType}: ${e.message}`);
            }
        }
    }

    /**
     * Ejecuta hooks de un tipo específico para una suite
     * @param suite Suite actual
     * @param hookType Tipo de hook
     * @param fromParentToChild Orden de ejecución
     */
    private runHooks(suite: Suite, hookType: keyof Suite, fromParentToChild: boolean): void {
        const hooks: Array<() => void> = [];
        let current: Suite | undefined = suite;
        
        while (current) {
            const hook = current[hookType] as (() => void) | undefined;
            if (hook) {
                if (fromParentToChild) {
                    hooks.unshift(hook);
                } else {
                    hooks.push(hook);
                }
            }
            current = current.parent;
        }

        for (const hook of hooks) {
            try {
                hook();
            } catch (e: any) {
                $.writeln(`    ⚠️ Error in ${hookType}: ${e.message}`);
            }
        }
    }
}

/**
 * Runs all registered test suites.
 * Defaults to running suites retrieved from `getSuites()`.
 * @param suites - Optional array of suites to run.
 * @param reporter - Optional reporter to use (defaults to ConsoleReporter).
 * @param filter - Optional string to filter tests by name (case-insensitive).
 */
export function runTests(suites = getSuites(), reporter?: TestReporter, filter?: string): void {
    const runner = new TestRunner(reporter, filter);
    runner.run(suites);
}
