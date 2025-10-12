//@include "utils/json2.js"

import {
    describe,
    it,
    beforeEach,
    afterEach,
    beforeAll,
    afterAll,
    expect,
    getSuites,
    type Matcher,
    Expect,
    createExpect,
    extendMatchers,
    throwError
} from './expect';

import { asAdobeType, isAdobeType } from './utils/asAdobeType';
import { runTests } from './runner';

export {
    describe,
    it,
    beforeEach,
    afterEach,
    beforeAll,
    afterAll,
    expect,
    getSuites,
    type Matcher,
    Expect,
    createExpect,
    extendMatchers,
    throwError,
    runTests,
    asAdobeType,
    isAdobeType
};
