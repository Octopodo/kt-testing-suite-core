import {
    describe,
    it,
    expect,
    TestRunner,
    JSONReporter
} from '../index';
import { Suite } from '../types';

// Subclass to capture output without writing to console
class CapturingJSONReporter extends JSONReporter {
    public capturedOutput: any = null;

    onFinished(results: { passed: number; failed: number; total: number }): void {
        // We recreate the logic from JSONReporter.onFinished to capture the object
        // Accessing private header via 'any' cast or just relying on internal state if it was protected
        // Since rootSuites is private, we can't easily access it unless we use 'any' or changed visibility.
        // Let's rely on the fact that we can access private members in tests with 'any' cast for verification.
        
        const output = {
            stats: results,
            suites: (this as any).rootSuites
        };
        this.capturedOutput = output;
    }
}

describe('JSONReporter', () => {
    it('should generate correct JSON structure for passing and failing tests', () => {
        // 1. Create a isolated mock suite structure
        const mockSuite: Suite = {
            description: 'Root Suite',
            tests: [
                {
                    name: 'Passing Test',
                    fn: () => { /* no-op pass */ }
                },
                {
                    name: 'Failing Test',
                    fn: () => { throw new Error('Test Error'); }
                }
            ],
            children: [
                {
                    description: 'Nested Suite',
                    tests: [
                         {
                            name: 'Nested Passing Test',
                            fn: () => { /* no-op pass */ }
                        }
                    ],
                    children: [],
                    parent: undefined // Parent link fixed below
                }
            ],
            parent: undefined
        };
        
        // Fix parent links (circular references usually made by describe())
        mockSuite.children![0].parent = mockSuite;

        // 2. Setup Runner with Capturing Reporter
        const reporter = new CapturingJSONReporter();
        const runner = new TestRunner(reporter);

        // 3. Run the mock suite
        runner.run([mockSuite]);

        // 4. Verify Output
        const output = reporter.capturedOutput;

        // Verify Stats
        expect(output.stats).toBeDefined();
        expect(output.stats.total).toBe(3);
        expect(output.stats.passed).toBe(2);
        expect(output.stats.failed).toBe(1);

        // Verify Root Suite
        expect(output.suites).toHaveLength(1);
        const rootResult = output.suites[0];
        expect(rootResult.description).toBe('Root Suite');
        expect(rootResult.tests).toHaveLength(2);

        // Verify Tests in Root
        const passTest = rootResult.tests[0];
        expect(passTest.name).toBe('Passing Test');
        expect(passTest.status).toBe('passed');
        expect(passTest.error).toBeUndefined();

        const failTest = rootResult.tests[1];
        expect(failTest.name).toBe('Failing Test');
        expect(failTest.status).toBe('failed');
        expect(failTest.error).toBeDefined();
        expect(failTest.error.message).toBe('Test Error');

        // Verify Nested Suite
        expect(rootResult.suites).toHaveLength(1);
        const nestedResult = rootResult.suites[0];
        expect(nestedResult.description).toBe('Nested Suite');
        expect(nestedResult.tests).toHaveLength(1);
        expect(nestedResult.tests[0].status).toBe('passed');
    });

    it('should handle empty suites', () => {
        const emptySuite: Suite = {
            description: 'Empty Suite',
            tests: [],
            children: []
        };

        const reporter = new CapturingJSONReporter();
        const runner = new TestRunner(reporter);
        runner.run([emptySuite]);

        const output = reporter.capturedOutput;
        expect(output.stats.total).toBe(0);
        expect(output.suites).toHaveLength(1);
        expect(output.suites[0].tests).toBeEmpty();
    });
});
