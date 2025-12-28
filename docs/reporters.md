# Reporters

Reporters allow you to customize the output of your test runs. By default, the KT Testing Suite uses the `ConsoleReporter` to print results to the ExtendScript console, but you can switch to `JSONReporter` for machine-readable output or create your own custom reporter.

## Built-in Reporters

### ConsoleReporter (Default)

Prints human-readable output to the standard output (using `$.writeln`). This is the default behavior if no reporter is specified.

**Output Example:**

```text
Suite: Math Operations
  Test: should add two numbers
    ✅ Passed
  Test: should subtract two numbers
    ✅ Passed

Test Results:
Passed: 2
Failed: 0
```

### JSONReporter

Prints test results as a structured JSON object, wrapped in start/end markers. This is useful for integration with other tools (like VS Code extensions or CI pipelines).

**Output Example:**

```text
JSON_OUTPUT_START
{
  "stats": {
    "passed": 2,
    "failed": 0,
    "total": 2
  },
  "suites": [
    {
      "description": "Math Operations",
      "tests": [
        {
          "name": "should add two numbers",
          "status": "passed"
        },
        ...
      ],
      "suites": []
    }
  ]
}
JSON_OUTPUT_END
```

## Using a Reporter

You can pass a reporter instance to the `runTests` function.

```typescript
import { runTests, JSONReporter } from "kt-testing-suite-core";

// Run with JSON output to console
runTests(undefined, new JSONReporter());

// Run with JSON output to file (recommended for IDE integration)
runTests(undefined, new JSONReporter("/path/to/results.json"));
```

If you want to use the default `ConsoleReporter` but explicitely:

```typescript
import { runTests, ConsoleReporter } from "kt-testing-suite-core";

runTests(undefined, new ConsoleReporter());
```

## Creating Custom Reporters

You can create your own reporter by implementing the `TestReporter` interface.

```typescript
import { TestReporter, Suite, Test, TestResult } from "kt-testing-suite-core";

class MyCustomReporter implements TestReporter {
  onStart(): void {
    $.writeln("--- Starting Tests ---");
  }

  onSuiteStart(suite: Suite): void {
    $.writeln(`Entering: ${suite.description}`);
  }

  onTestStart(test: Test): void {
    // Called before test execution
  }

  onTestEnd(test: Test, result: TestResult): void {
    const icon = result.status === "passed" ? "OK" : "FAIL";
    $.writeln(`[${icon}] ${test.name}`);
  }

  onSuiteEnd(suite: Suite): void {
    // Called after suite execution
  }

  onFinished(results: { passed: number; failed: number; total: number }): void {
    $.writeln(`--- Done. Passed: ${results.passed}/${results.total} ---`);
  }
}

// Usage
import { runTests } from "kt-testing-suite-core";
runTests(undefined, new MyCustomReporter());
```
