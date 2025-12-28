import { TestReporter, TestResult, SuiteResult } from './types';
import { Suite, Test } from '../types';
import { ConsoleReporter } from './ConsoleReporter';

export class JSONReporter implements TestReporter {
    private rootSuites: SuiteResult[] = [];
    private suiteStack: SuiteResult[] = [];
    private outputPath?: string;
    private consoleReporter: ConsoleReporter;

    constructor(outputPath?: string) {
        this.outputPath = outputPath;
        this.consoleReporter = new ConsoleReporter();
    }

    onStart(): void {
        this.rootSuites = [];
        this.suiteStack = [];
        this.consoleReporter.onStart();
    }

    onSuiteStart(suite: Suite): void {
        // JSON Logic
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

        // Console Logic
        this.consoleReporter.onSuiteStart(suite);
    }

    onTestStart(test: Test): void {
        this.consoleReporter.onTestStart(test);
    }

    onTestEnd(test: Test, result: TestResult): void {
        const currentSuite = this.suiteStack[this.suiteStack.length - 1];
        if (currentSuite) {
            currentSuite.tests.push(result);
        }
        this.consoleReporter.onTestEnd(test, result);
    }

    onSuiteEnd(suite: Suite): void {
        this.suiteStack.pop();
        this.consoleReporter.onSuiteEnd(suite);
    }

    onFinished(results: { passed: number; failed: number; total: number }): void {
        // Output Console Summary first
        this.consoleReporter.onFinished(results);

        const output = {
            stats: results,
            suites: this.rootSuites
        };
        
        const jsonString = JSON.stringify(output, null, 2);

        if (this.outputPath) {
            try {
                const f = new File(this.outputPath);
                f.open('w');
                f.write(jsonString);
                f.close();
            } catch (e: any) {
                 $.writeln(`    ⚠️ Error writing JSON report to ${this.outputPath}: ${e.message}`);
            }
        } else {
            $.writeln('JSON_OUTPUT_START');
            $.writeln(jsonString);
            $.writeln('JSON_OUTPUT_END');
        }
    }
}
