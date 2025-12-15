import { Test, Suite, TestFn } from './types';

const suites: Suite[] = [];
let currentSuite: Suite | undefined = undefined;

/**
 * Creates a new test suite.
 * @param description - The description of the test suite.
 * @param fn - The callback function containing the tests for this suite.
 * 
 * @example
 * ```typescript
 * describe('Math operations', () => {
 *   it('should add numbers', () => {
 *     expect(1 + 1).toBe(2);
 *   });
 * });
 * ```
 */
export function describe(description: string, fn: () => void): void {
    const tests: Test[] = [];
    const children: Suite[] = [];
    const parent = currentSuite;
    currentSuite = { description, tests, children, parent };

    if (parent) {
        parent.children!.push(currentSuite); // Añadimos como hijo del padre
    } else {
        suites.push(currentSuite); // Solo suites raíz van a suites
    }

    fn();
    currentSuite = parent;
}

/**
 * Define a single test case.
 * @param name - The name of the test.
 * @param fn - The function to execute for this test.
 * 
 * @example
 * ```typescript
 * it('should check if values are equal', () => {
 *   expect(10).toBe(10);
 * });
 * ```
 */
export function it(name: string, fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('it() must be called inside a describe()');
    }
    currentSuite.tests.push({ name, fn });
}

/**
 * Register a callback to be run before each test in the current suite.
 * @param fn - The function to run before each test.
 */
export function beforeEach(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('beforeEach() must be called inside a describe()');
    }
    currentSuite.beforeEach = fn;
}

/**
 * Register a callback to be run after each test in the current suite.
 * @param fn - The function to run after each test.
 */
export function afterEach(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('afterEach() must be called inside a describe()');
    }
    currentSuite.afterEach = fn;
}

/**
 * Register a callback to be run once before all tests in the current suite.
 * @param fn - The function to run before all tests.
 */
export function beforeAll(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('beforeAll() must be called inside a describe()');
    }
    currentSuite.beforeAll = fn;
}

/**
 * Register a callback to be run once after all tests in the current suite.
 * @param fn - The function to run after all tests.
 */
export function afterAll(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('afterAll() must be called inside a describe()');
    }
    currentSuite.afterAll = fn;
}

/**
 * Retrieves the list of all registered test suites.
 * @returns An array of Suite objects.
 */
export function getSuites(): Suite[] {
    return suites;
}
