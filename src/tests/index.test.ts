// src/tests/index.test.ts
import { describe, runTests } from '../index';

import './baseMatchers.test';
import './not.test';
import './toPassAny.test';
import './extend.test';
import './beforeAfterEach.test';
runTests();
