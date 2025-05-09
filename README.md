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

## Using `beforeEach` and `afterEach` Hooks

The testing suite supports `beforeEach` and `afterEach` hooks to set up and tear down conditions before and after each test within a `describe` block or the entire file.

-   `beforeEach(fn)`: Runs the provided function `fn` before each test in the current scope.
-   `afterEach(fn)`: Runs the provided function `fn` after each test in the current scope.

These hooks are useful for tasks like resetting state, cleaning up resources, or initializing common variables needed for multiple tests.

**Example:**

```javascript
// src/tests/hooks-basic-example.test.ts
import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach
} from 'kt-testing-suite-core';

describe('Basic Hooks', () => {
    let counter = 0;

    beforeEach(() => {
        counter = 1; // Set counter before each test
    });

    afterEach(() => {
        counter = 0; // Reset counter after each test
    });

    it('should start with counter at 1', () => {
        expect(counter).toBe(1);
        counter = 5; // Modify counter
    });

    it('should reset counter for the next test', () => {
        expect(counter).toBe(1); // Counter is reset to 1 by beforeEach
    });
});
```

Output:

```
Suite: Basic Hooks
  Test: should start with counter at 1
    ✅ Passed
  Test: should reset counter for the next test
    ✅ Passed

Test Results:
Passed: 2
Failed: 0
```

## Nested Hooks

Hooks can be nested within `describe` blocks. When hooks are nested, they follow a specific execution order:

-   **`beforeEach`**: Outer hooks run before inner hooks (parent → child).

-   **`afterEach`**: Inner hooks run before outer hooks (child → parent).

This allows for setting up and tearing down context specific to nested suites while inheriting the setup/teardown from parent suites.

**Example:**

```javascript
// src/tests/hooks-nested-example.test.ts
import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach
} from 'kt-testing-suite-core';

describe('Outer Suite', () => {
    let counter = 0;

    beforeEach(() => {
        counter = 1; // Outer setup
    });

    afterEach(() => {
        counter = 0; // Outer cleanup
    });

    it('should start with counter at 1', () => {
        expect(counter).toBe(1);
    });

    describe('Inner Suite', () => {
        beforeEach(() => {
            counter += 10; // Inner setup runs after outer
        });

        afterEach(() => {
            counter -= 10; // Inner cleanup runs before outer
        });

        it('should combine outer and inner hooks', () => {
            expect(counter).toBe(11); // 1 (outer) + 10 (inner)
        });
    });
});
```

Output:

```
Suite: Outer Suite
  Test: should start with counter at 1
    ✅ Passed
Suite: Inner Suite
  Test: should combine outer and inner hooks
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
-   [KT Extendscript Builder](https://github.com/Octopodo/kt-extendscript-builder)
