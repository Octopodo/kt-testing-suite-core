import { Suite } from './types';
import { getSuites } from './describe';

/**
 * Class responsible for executing test suites and tracking results.
 */
export class TestRunner {
    private passedTests = 0;
    private failedTests = 0;

    /**
     * Executes the provided test suites.
     * @param suites - An array of test suites to run.
     */
    run(suites: Suite[]): void {
        for (const suite of suites) {
            this.runSuite(suite);
        }
        this.showResults();
    }

    private runSuite(suite: Suite): void {
        $.writeln(`Suite: ${suite.description}`);

        // Ejecutar beforeAll hooks - solo los de esta suite específica
        this.runSuiteHooks(suite, 'beforeAll', true);

        try {
            // Ejecutar los tests de la suite actual
            for (const test of suite.tests) {
                $.writeln(`  Test: ${test.name}`);
                try {
                    // beforeEach/afterEach sí deben heredar de toda la jerarquía
                    this.runHooks(suite, 'beforeEach', true);
                    test.fn();
                    this.passedTests++;
                    $.writeln('    ✅ Passed');
                } catch (e: any) {
                    this.failedTests++;
                    $.writeln(`    ❌ Failed: ${e.message}
                            ${e.fileName}
                            ${e.line}`);
                } finally {
                    this.runHooks(suite, 'afterEach', false);
                }
            }

            // Ejecutar las suites anidadas (children), si existen
            if (suite.children && suite.children.length > 0) {
                for (const childSuite of suite.children) {
                    this.runSuite(childSuite);
                }
            }
        } finally {
            // Ejecutar afterAll hooks - solo los de esta suite específica
            this.runSuiteHooks(suite, 'afterAll', false);
        }
    }

    /**
     * Ejecuta hooks de suite específicos (beforeAll/afterAll) - solo los de la suite actual
     * @param suite Suite actual
     * @param hookType Tipo de hook ('beforeAll', 'afterAll')
     * @param fromParentToChild true para ejecutar de padre a hijo, false para hijo a padre
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
     * @param hookType Tipo de hook ('beforeEach', 'afterEach', 'beforeAll', 'afterAll')
     * @param fromParentToChild true para ejecutar de padre a hijo, false para hijo a padre
     */
    private runHooks(suite: Suite, hookType: keyof Suite, fromParentToChild: boolean): void {
        const hooks: Array<() => void> = [];
        let current: Suite | undefined = suite;
        
        // Recolectar hooks desde la jerarquía
        while (current) {
            const hook = current[hookType] as (() => void) | undefined;
            if (hook) {
                if (fromParentToChild) {
                    hooks.unshift(hook); // Insertar al principio (padre → hijo)
                } else {
                    hooks.push(hook);    // Añadir al final (hijo → padre)
                }
            }
            current = current.parent;
        }

        // Ejecutar hooks
        for (const hook of hooks) {
            try {
                hook();
            } catch (e: any) {
                $.writeln(`    ⚠️ Error in ${hookType}: ${e.message}`);
            }
        }
    }

    private showResults(): void {
        $.writeln('\nTest Results:');
        $.writeln(`Passed: ${this.passedTests}`);
        $.writeln(`Failed: ${this.failedTests}`);
    }
}

/**
 * Runs all registered test suites.
 * Defaults to running suites retrieved from `getSuites()`.
 * @param suites - Optional array of suites to run.
 */
export function runTests(suites = getSuites()): void {
    const runner = new TestRunner();
    runner.run(suites);
}
