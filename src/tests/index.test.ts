// src/tests/index.test.ts
import { describe, it, expect, runTests, getSuites } from '../index';
import { KT } from 'kt-core';

KT.Module('Test', describe);

import './baseMatchers.test';
import './not.test';

runTests();
