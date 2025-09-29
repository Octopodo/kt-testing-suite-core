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
import { describe, it, expect } from "kt-testing-suite-core";

describe("Example Test Suite", () => {
  it("should pass this test", () => {
    expect(true).toBe(true);
  });

  it("should match the snapshot", () => {
    const result = { key: "value" };
    expect(result).toBeEqual({ key: "value" });
  });
});
```

## Adobe Type Helpers

For Adobe applications (After Effects, Premiere, etc.), use type helpers to avoid TypeScript errors when accessing Adobe-specific properties:

```javascript
import { expect, asAdobeType, isAdobeType } from "kt-testing-suite-core";

// Safe type assertion
const layer = asAdobeType < AVLayer > someLayer;
expect(layer.source.mainSource).toBeInstanceOf(FootageSource);

// Type guard
if (isAdobeType(someLayer, AVLayer)) {
  // TypeScript now knows it's an AVLayer
}
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

## Using Hooks

The testing suite supports hooks for setup and teardown operations:

- `beforeEach()`: Runs before each test
- `afterEach()`: Runs after each test
- `beforeAll()`: Runs once before all tests in a suite
- `afterAll()`: Runs once after all tests in a suite

Hooks can be nested and are useful for initializing test data, cleaning up resources, or resetting state.

**Example:**

```javascript
describe("My Tests", () => {
  let data;

  beforeAll(() => {
    data = "initialized"; // Setup once
  });

  beforeEach(() => {
    data = "reset"; // Reset before each test
  });

  it("should use fresh data", () => {
    expect(data).toBe("reset");
  });
});
```

For detailed examples and advanced usage including nested hooks, see the [Core Documentation](docs/core.md).

## Documentation

For more detailed documentation, please refer to the specific README files in the `docs` folder:

- [Core](docs/core.md)
- [Matchers](docs/matchers.md)
- [Extensibility](docs/extensibility.md)

## Test Files

You can find the test files in the `src/tests` directory:

- [Example Tests](src/tests/baseMatchers.test.ts)

For more examples and detailed usage, please refer to the test files in the repository.

## Links

- [Bolt Cep](https://github.com/hyperbrew/bolt-cep)
- [KT Extendscript Builder](https://github.com/Octopodo/kt-extendscript-builder)
