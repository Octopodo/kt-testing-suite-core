import {
    describe,
    it,
    expect,
    TestRunner,
    ConsoleReporter
} from '../index';
import { Suite } from '../types';
import { TestReporter } from '../reporters/types';

// Mock Reporter to capture run stats
class MockReporter extends ConsoleReporter {
    public stats: { passed: number; failed: number; total: number } | null = null;
    public runTests: string[] = [];

    onTestStart(test: any): void {
        this.runTests.push(test.name);
    }

    onFinished(results: { passed: number; failed: number; total: number }): void {
        this.stats = results;
    }
}

describe('TestRunner Filtering', () => {
    // Helper to create a test suite structure
    const createMockSuite = (): Suite => {
        const suite: Suite = {
            description: 'Root Suite',
            tests: [
                { name: 'match', fn: () => {} },
                { name: 'ignore', fn: () => {} }
            ],
            children: [
                {
                    description: 'Nested Suite',
                    tests: [
                        { name: 'deep match', fn: () => {} },
                        { name: 'deep ignore', fn: () => {} }
                    ],
                    children: [],
                    parent: undefined
                }
            ],
            parent: undefined
        };
        // Fix parent link
        suite.children![0].parent = suite;
        return suite;
    };

    it('should run all tests when no filter is provided', () => {
        const suite = createMockSuite();
        const reporter = new MockReporter();
        const runner = new TestRunner(reporter); // No filter

        runner.run([suite]);

        expect(reporter.stats).toBeDefined();
        if (reporter.stats) {
            expect(reporter.stats.total).toBe(4);
            expect(reporter.runTests).toHaveLength(4);
        }
    });

    it('should run only tests matching the filter (simple match)', () => {
        const suite = createMockSuite();
        const reporter = new MockReporter();
        const runner = new TestRunner(reporter, 'match');

        runner.run([suite]);

        expect(reporter.stats).toBeDefined();
        if (reporter.stats) {
            expect(reporter.runTests).toInclude('match');
            expect(reporter.runTests).toInclude('deep match');
            expect(reporter.runTests).not().toInclude('ignore');
            expect(reporter.runTests).not().toInclude('deep ignore');
            expect(reporter.stats.total).toBe(2);
        }
    });

    it('should run only tests matching the filter (nested suite description match)', () => {
        const suite = createMockSuite();
        const reporter = new MockReporter();
        const runner = new TestRunner(reporter, 'Nested'); // Should match everything in Nested Suite

        runner.run([suite]);
        
        // "Nested Suite deep match", "Nested Suite deep ignore"
        // Wait, logic implementation checks full name: `${currentDescription} ${test.name}`
        // Root Suite -> Nested Suite matches "Nested"
        // So tests inside "Nested Suite" will be "Root Suite Nested Suite deep match" -> matches "Nested"
        
        expect(reporter.stats).toBeDefined();
        if (reporter.stats) {
            expect(reporter.runTests).toInclude('deep match');
            expect(reporter.runTests).toInclude('deep ignore');
            expect(reporter.runTests).not().toInclude('match'); // Root matches don't have "Nested"
            expect(reporter.stats.total).toBe(2);
        }
    });

    it('should match case-insensitive', () => {
        const suite = createMockSuite();
        const reporter = new MockReporter();
        const runner = new TestRunner(reporter, 'MATCH');

        runner.run([suite]);

        expect(reporter.runTests).toInclude('match');
        expect(reporter.runTests).toInclude('deep match');
    });

    it('should run no tests if filter matches nothing', () => {
        const suite = createMockSuite();
        const reporter = new MockReporter();
        const runner = new TestRunner(reporter, 'NonExistent');

        runner.run([suite]);

        if (reporter.stats) {
            expect(reporter.stats.total).toBe(0);
        }
    });
});
