import { createExpect, type Matcher, Expect } from './core';
import { jsMatchers } from './matchers/js';
import { afterEffectsMatchers } from './matchers/aftereffects';
import { describe, it, getSuites } from '../describe';

export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return createExpect(actual, [jsMatchers]);
}

// export namespace AE {
//     export function expect<T>(actual: T): Expect<T> & Matcher<T> {
//         return createExpect(actual, [jsMatchers, afterEffectsMatchers]);
//     }
// }

export { describe, it, getSuites, Matcher, Expect, createExpect };
