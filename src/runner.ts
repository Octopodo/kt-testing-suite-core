// lib/runner.ts
import { Suite } from './types';
import { getSuites } from './describe';
export class TestRunner {
    private passedTests = 0;
    private failedTests = 0;

    run(suites: Suite[]): void {
        for (const suite of suites) {
            $.writeln(`Suite: ${suite.description}`);
            for (const test of suite.tests) {
                $.writeln(`  Test: ${test.name}`);
                try {
                    test.fn();
                    this.passedTests++;
                    $.writeln('    ✅ Passed');
                } catch (e: any) {
                    this.failedTests++;
                    $.writeln(`    ❌ Failed: ${e.message}
                        ${e.fileName}
                        ${e.line}`);
                }
            }
        }
        this.showResults();
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
