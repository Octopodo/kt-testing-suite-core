// lib/types.ts
export interface Test {
    name: string;
    fn: TestFn;
}

export interface TestFn {
    (): void;
}

export interface Suite {
    description: string;
    tests: Test[];
    beforeEach?: TestFn;
    afterEach?: TestFn;
    parent?: Suite;
    children?: Suite[];
}
