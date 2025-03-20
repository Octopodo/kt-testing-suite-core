// lib/describe.ts
import { Test, Suite, TestFn } from './types';

const suites: Suite[] = [];
let currentSuite: Suite | null = null;

export function describe(description: string, fn: () => void): void {
    const tests: Test[] = [];
    currentSuite = { description, tests };
    suites.push(currentSuite);

    // Ejecutar el contenido para recolectar pruebas
    fn();
    currentSuite = null; // Resetear después de recolectar
}

export function it(name: string, fn: TestFn): void {
    if (!currentSuite) {
        throw new Error('it() must be called inside a describe()');
    }
    currentSuite.tests.push({ name, fn });
}

export function getSuites(): Suite[] {
    return suites;
}
