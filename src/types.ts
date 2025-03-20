// lib/types.ts
export type TestFn = () => void;

export interface Test {
    name: string;
    fn: TestFn;
}

export interface Suite {
    description: string;
    tests: Test[];
}
