import { createExpect, type Matcher, Expect } from './core';
import { jsMatchers } from './matchers/js';
import { IOMatchers } from './matchers/io';

/**
 * Creates an assertion for a value.
 * @template T - The type of the value being tested.
 * @param actual - The value to be tested.
 * @returns An Expect instance with default and IO matchers.
 * 
 * @example
 * ```typescript
 * expect(1).toBe(1);
 * expect('test').toBeString();
 * expect(file).toBeFile();
 * ```
 */
export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return createExpect(actual, [jsMatchers, IOMatchers]);
}

/**
 * Throws a formatted error.
 * Used by matchers to report failures.
 * @param message - The error message.
 * @throws {Error} Always throws an error with the provided message.
 */
export function throwError(message: string): never {
    throw new Error(message);  // Runner will catch and format this consistently
}