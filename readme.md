# KT Testing Suite

Welcome to the KT Testing Suite! This suite provides a comprehensive set of tools for testing ExtendScript scripts writen in TypeScript.

## Overview

The suite is designed with [Vitest](https://vitest.dev/) in mind, ensuring they function correctly and efficiently. It includes a variety of matchers and extensibility features to cover a wide range of testing scenarios.

Also, KT Testing suit is integrated with KT Create Plugin, so you can develop Adobe scripts in ExtendScript in TypeScript.

All this enviroment is based on [Bolt CEP](https://github.com/hyperbrew/bolt-cep) building code, so you can use it with Bolt itself.

## Installation

To install the KT Testing Suite, use the following command:

```bash
npm install kt-testing-suite-core
```

## Running Tests

To execute tests, just go to the debug panel on vscode and select one option and pres F5:

#### - Build and Run Tests

#### - Run tests

## Writing Tests

Your tests must be placed inside the `src/tests` folder. You can separate the tests into different files, but they must be imported in an `index.test.ts` file to be executed.

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
        expect(result).toMatchSnapshot();
    });
});
```

Then, you can import it on your `index.test.ts` and call `runTests():

```javascript
// src/tests/index.test.ts
import { runTests } from 'kt-testing-suite-core';

import './my-tests.test.ts';

runTests();
```

## Documentation

For more detailed documentation, please refer to the specific README files in the `docs` folder:

-   [Core](docs/core.md)
-   [Matchers](docs/matchers.md)
-   [Extensibility](docs/extensibility.md)

## Test Files

You can find the test files in the `src/tests` directory:

-   [Example Test](src/tests/example.test.js)

For more examples and detailed usage, please refer to the test files in the repository.

## Links

-   [Bolt Cep](https://github.com/hyperbrew/bolt-cep)
-   [KT Plugin Template](https://github.com/Octopodo/kt-plugin-template)

```

```
