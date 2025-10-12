import { createExpect, type Matcher, Expect } from './core';
import { jsMatchers } from './matchers/js';
import { IOMatchers } from './matchers/io';

export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return createExpect(actual, [jsMatchers, IOMatchers]);
}

export function throwError(message: string): never {
    throw new Error(message);  // Runner will catch and format this consistently
}