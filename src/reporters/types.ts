import { Suite, Test } from '../types';

export interface TestResult {
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    error?: {
        message: string;
        fileName?: string;
        line?: number;
    };
    duration?: number;
}

export interface SuiteResult {
    description: string;
    tests: TestResult[];
    suites: SuiteResult[];
}

export interface TestReporter {
    onStart(): void;
    onSuiteStart(suite: Suite): void;
    onTestStart(test: Test): void;
    onTestEnd(test: Test, result: TestResult): void;
    onSuiteEnd(suite: Suite): void;
    onFinished(results: { passed: number; failed: number; total: number }): void;
}
