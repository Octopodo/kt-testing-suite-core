import { createExpect, type Matcher, Expect } from './core';
import { jsMatchers } from './matchers/js';

export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return createExpect(actual, [jsMatchers]);
}