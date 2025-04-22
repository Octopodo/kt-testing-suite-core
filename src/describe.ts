import { Test, Suite, TestFn } from './types';

const suites: Suite[] = [];
let currentSuite: Suite | undefined = undefined;

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

export function it(name: string, fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('it() must be called inside a describe()');
    }
    currentSuite.tests.push({ name, fn });
}

export function beforeEach(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('beforeEach() must be called inside a describe()');
    }
    currentSuite.beforeEach = fn;
}

export function afterEach(fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('afterEach() must be called inside a describe()');
    }
    currentSuite.afterEach = fn;
}

export function getSuites(): Suite[] {
    return suites;
}
