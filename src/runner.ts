import { Suite } from './types';
import { getSuites } from './describe';

export class TestRunner {
    private passedTests = 0;
    private failedTests = 0;

    run(suites: Suite[]): void {
        for (const suite of suites) {
            this.runSuite(suite);
        }
        this.showResults();
    }

    private runSuite(suite: Suite): void {
        $.writeln(`Suite: ${suite.description}`);

        // Ejecutar los tests de la suite actual
        for (const test of suite.tests) {
            $.writeln(`  Test: ${test.name}`);
            try {
                this.runBeforeEach(suite);
                test.fn();
                this.passedTests++;
                $.writeln('    ✅ Passed');
            } catch (e: any) {
                this.failedTests++;
                $.writeln(`    ❌ Failed: ${e.message}
                        ${e.fileName}
                        ${e.line}`);
            } finally {
                this.runAfterEach(suite);
            }
        }

        // Ejecutar las suites anidadas (children), si existen
        if (suite.children && suite.children.length > 0) {
            for (const childSuite of suite.children) {
                this.runSuite(childSuite);
            }
        }
    }

    private runBeforeEach(suite: Suite): void {
        const beforeEachHooks: Array<() => void> = [];
        let current: Suite | undefined = suite;
        while (current) {
            if (current.beforeEach) {
                beforeEachHooks.unshift(current.beforeEach);
            }
            current = current.parent;
        }

        for (const hook of beforeEachHooks) {
            hook();
        }
    }

    private runAfterEach(suite: Suite): void {
        const afterEachHooks: Array<() => void> = [];
        let current: Suite | undefined = suite;
        while (current) {
            if (current.afterEach) {
                afterEachHooks.push(current.afterEach);
            }
            current = current.parent;
        }

        for (const hook of afterEachHooks) {
            try {
                hook();
            } catch (e: any) {
                $.writeln(`    ⚠️ Error in afterEach: ${e.message}`);
            }
        }
    }

    private showResults(): void {
        $.writeln('\nTest Results:');
        $.writeln(`Passed: ${this.passedTests}`);
        $.writeln(`Failed: ${this.failedTests}`);
    }
}

export function runTests(suites = getSuites()): void {
    const runner = new TestRunner();
    runner.run(suites);
}
