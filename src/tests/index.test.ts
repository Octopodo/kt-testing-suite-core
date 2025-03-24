// src/tests/index.test.ts
import { describe, runTests } from '../index';
import { KT } from 'kt-core';

KT.Module('Test', describe);

import './baseMatchers.test';
import './not.test';
import './toPassAny.test';
import './extend.test';
runTests();
