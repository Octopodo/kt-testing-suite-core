import { createExpect, extendMatchers, type Matcher, Expect } from './core';
import { jsMatchers } from './matchers/js';
import { IOMatchers } from './matchers/io';
import { describe, it, beforeEach, afterEach, getSuites } from '../describe';

export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return createExpect(actual, [jsMatchers, IOMatchers]);
}

export {
    describe,
    it,
    beforeEach,
    afterEach,
    getSuites,
    Matcher,
    Expect,
    createExpect,
    extendMatchers
};
