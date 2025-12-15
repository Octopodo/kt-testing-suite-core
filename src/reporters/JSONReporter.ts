import { TestReporter, TestResult, SuiteResult } from './types';
import { Suite, Test } from '../types';

export class JSONReporter implements TestReporter {
    private rootSuites: SuiteResult[] = [];
    private suiteStack: SuiteResult[] = [];

    onStart(): void {
        this.rootSuites = [];
        this.suiteStack = [];
    }

    onSuiteStart(suite: Suite): void {
        const suiteResult: SuiteResult = {
            description: suite.description,
            tests: [],
            suites: []
        };

        if (this.suiteStack.length > 0) {
            const parent = this.suiteStack[this.suiteStack.length - 1];
            parent.suites.push(suiteResult);
        } else {
            this.rootSuites.push(suiteResult);
        }

        this.suiteStack.push(suiteResult);
    }

    onTestStart(test: Test): void {
        // No op - wait for result
    }

    onTestEnd(test: Test, result: TestResult): void {
        const currentSuite = this.suiteStack[this.suiteStack.length - 1];
        if (currentSuite) {
            currentSuite.tests.push(result);
        }
    }

    onSuiteEnd(suite: Suite): void {
        this.suiteStack.pop();
    }

    onFinished(results: { passed: number; failed: number; total: number }): void {
        const output = {
            stats: results,
            suites: this.rootSuites
        };
        $.writeln('JSON_OUTPUT_START');
        $.writeln(JSON.stringify(output, null, 2));
        $.writeln('JSON_OUTPUT_END');
    }
}
