import { TestReporter, TestResult } from './types';
import { Suite, Test } from '../types';

export class ConsoleReporter implements TestReporter {
    onStart(): void {
        // No op
    }

    onSuiteStart(suite: Suite): void {
        $.writeln(`Suite: ${suite.description}`);
    }

    onTestStart(test: Test): void {
        $.writeln(`  Test: ${test.name}`);
    }

    onTestEnd(test: Test, result: TestResult): void {
        if (result.status === 'passed') {
            $.writeln('    ✅ Passed');
        } else if (result.status === 'failed') {
            const error = result.error!;
            $.writeln(`    ❌ Failed: ${error.message}
                            ${error.fileName || ''}
                            ${error.line || ''}`);
        } else {
            $.writeln('    ⚠️ Skipped');
        }
    }

    onSuiteEnd(suite: Suite): void {
        // No op
    }

    onFinished(results: { passed: number; failed: number; total: number }): void {
        $.writeln('\nTest Results:');
        $.writeln(`Passed: ${results.passed}`);
        $.writeln(`Failed: ${results.failed}`);
    }
}
