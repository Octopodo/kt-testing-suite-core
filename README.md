# KT Testing Suite

Welcome to the KT Testing Suite! This suite provides a comprehensive set of tools for testing ExtendScript scripts writen in TypeScript.

## Overview

The suite is designed with [Vitest](https://vitest.dev/) in mind, ensuring they function correctly and efficiently. It includes a variety of matchers and extensibility features to cover a wide range of testing scenarios.

Also, KT Testing Suite is integrated with [KT Create Plugin](https://github.com/Octopodo/kt-plugin-template), so you can develop Adobe scripts in ExtendScript with TypeScript.

All this enviroment is based on [Bolt CEP](https://github.com/hyperbrew/bolt-cep) building code, so you can use it with Bolt itself.

## Installation

To install the KT Testing Suite, use the following command:

```bash
npm install kt-testing-suite-core
```

## Writing Tests

You can place your tests werever you want. You can separate the tests into different files, but they must be imported in a main test file to be executed, I.E. `index.test.ts`.

Here are some examples of how to write tests using the KT Testing Suite:

```javascript
// src/tests/my-tests.test.ts
import { describe, it, expect } from 'kt-testing-suite-core';

describe('Example Test Suite', () => {
    it('should pass this test', () => {
        expect(true).toBe(true);
    });

    it('should match the snapshot', () => {
        const result = { key: 'value' };
        expect(result).toBeEqual({ key: 'value' });
    });
});
```

Then, you can import it on your `index.test.ts` and call `runTests()`:

```javascript
// src/tests/index.test.ts
import { runTests } from 'kt-testing-suite-core';

import './my-tests.test.ts';

runTests();
```

## Build Tests

To transpile tests to Extendscript run:

```bash
npm run build-tests
```

## Run Tests

To execute tests, use the [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug), making sure you point to your tests entry file, in the previous expample is `src/tests/index.test.ts`.

Output:

```
Suite: Example Test Suite
  Test: should pass this test
    ✅ Passed
  Test: should match the snapshot
    ✅ Passed

Test Results:
Passed: 2
Failed: 0
```

## Documentation

For more detailed documentation, please refer to the specific README files in the `docs` folder:

-   [Core](docs/core.md)
-   [Matchers](docs/matchers.md)
-   [Extensibility](docs/extensibility.md)

## Test Files

You can find the test files in the `src/tests` directory:

-   [Example Tests](src/tests/baseMatchers.test.ts)

For more examples and detailed usage, please refer to the test files in the repository.

## Links

-   [Bolt Cep](https://github.com/hyperbrew/bolt-cep)
-   [KT Plugin Template](https://github.com/Octopodo/kt-plugin-template)

```

```
