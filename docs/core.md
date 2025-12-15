# KT Testing Suite Core Documentation

## Objects

### TestFn

Defines a function type for tests.

### Test

Represents a single test with a name and a function to execute.

**Properties:**

| Property | Type              | Description                       |
| -------- | ----------------- | --------------------------------- |
| `name`   | string            | The name of the test.             |
| `fn`     | [TestFn](#testfn) | The function to execute the test. |

### Suite

Represents a suite of tests with a description and an array of tests.

**Properties:**

| Property      | Type   | Description                        |
| ------------- | ------ | ---------------------------------- |
| `description` | string | The description of the test suite. |
| `tests`       | Test[] | The array of tests in the suite.   |

### describe

Defines a test suite.

**Arguments:**

| Argument      | Type       | Description                               |
| ------------- | ---------- | ----------------------------------------- |
| `description` | string     | The description of the test suite.        |
| `fn`          | () => void | The function containing test definitions. |

**Example:**

```typescript
describe("Example Suite", () => {
  it("should pass", () => {
    // Test code here
  });
});
```

### it

Defines a test within a suite.

**Arguments:**

| Argument | Type   | Description              |
| -------- | ------ | ------------------------ |
| `name`   | string | The name of the test.    |
| `fn`     | TestFn | The function to execute. |

**Example:**

```typescript
it("should pass", () => {
  // Test code here
});
```

### getSuites

Returns all defined test suites.

**Example:**

```typescript
const suites = getSuites();
console.log(suites);
```

### expect

Creates an instance of `Expect` with the provided matchers.

**Arguments:**

| Argument | Type | Description               |
| -------- | ---- | ------------------------- |
| `actual` | T    | The actual value to test. |

**Example:**

```typescript
expect(5).toBe(5);
```

### Expect

Class for handling test expectations.

**Properties:**

| Property   | Type    | Description                                        |
| ---------- | ------- | -------------------------------------------------- |
| `actual`   | T       | The actual value to be tested.                     |
| `inverted` | boolean | Boolean indicating if the expectation is inverted. |

**Methods:**

| Method                                        | Description                                       |
| --------------------------------------------- | ------------------------------------------------- | -------- | ------------ | ------------------------------------------- |
| `not(): Expect<T> & Matcher<T>`               | Inverts the expectation.                          |
| `assert(condition: boolean, message: string)` | Asserts a condition.                              |
| `toSafeString(value: any): string`            | Converts a value to a safe string representation. |
| `getSafeActual(type: 'array'                  | 'string'                                          | 'number' | 'any'): any` | Gets a safe actual value based on the type. |

### createExpect

Creates an `Expect` instance with the provided matchers.

**Arguments:**

| Argument   | Type         | Description                   |
| ---------- | ------------ | ----------------------------- |
| `actual`   | T            | The actual value to test.     |
| `matchers` | Matcher<T>[] | The array of matchers to use. |

**Example:**

```typescript
const expectInstance = createExpect(5);
expectInstance.toBe(5);
```

### TestRunner

Class for running test suites and displaying results. You can customize the output using a [Reporter](reporters.md).

**Constructor:**
`new TestRunner(reporter?: TestReporter, filter?: string)`

- `reporter`: Optional. Defaults to `ConsoleReporter`.
- `filter`: Optional. A case-insensitive string. Only tests whose full name (including suite descriptions) contains this string will be executed.

**Properties:**

| Property      | Type   | Description             |
| ------------- | ------ | ----------------------- |
| `passedTests` | number | Number of passed tests. |
| `failedTests` | number | Number of failed tests. |

**Methods:**

| Method                       | Description                    |
| ---------------------------- | ------------------------------ |
| `run(suites: Suite[]): void` | Runs the provided test suites. |

**Example:**

```typescript
const runner = new TestRunner(); // Uses ConsoleReporter by default
runner.run(getSuites());
```

### runTests

Runs all defined test suites.

**Arguments:**

| Argument   | Type           | Description                                                                                                |
| ---------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `suites`   | Suite[]        | The array of test suites to run.                                                                           |
| `reporter` | `TestReporter` | (Optional) The reporter to use. Defaults to `ConsoleReporter`.                                             |
| `filter`   | `string`       | (Optional) A string to filter tests. Only tests/suites containing this string (case-insensitive) will run. |

**Example:**

```typescript
import { runTests, JSONReporter } from "kt-testing-suite-core";

// Default
runTests();

// With Custom Reporter
runTests(undefined, new JSONReporter());

// With Filter (run only tests containing "auth")
runTests(undefined, undefined, "auth");
```

### Expected Output Example

```plaintext
Suite: Example Suite
    Test: should pass
        ✅ Passed
    Test: should fail
        ❌ Failed: Error message
                filename.ts
                line number

Test Results:
Passed: 1
Failed: 1
```
