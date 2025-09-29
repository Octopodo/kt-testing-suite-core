# Using Hooks

The testing suite supports various hooks to set up and tear down conditions for your tests.

## Hook Types

### Test-Level Hooks

- `beforeEach(fn)`: Runs the provided function `fn` before each test in the current scope.
- `afterEach(fn)`: Runs the provided function `fn` after each test in the current scope.

### Suite-Level Hooks

- `beforeAll(fn)`: Runs the provided function `fn` once before all tests in the current suite.
- `afterAll(fn)`: Runs the provided function `fn` once after all tests in the current suite.

These hooks are useful for tasks like resetting state, cleaning up resources, or initializing common variables needed for multiple tests.

## Basic Hook Usage

**Example:**

```typescript
// src/tests/hooks-basic-example.test.ts
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "kt-testing-suite-core";

describe("Basic Hooks", () => {
  let counter = 0;

  beforeEach(() => {
    counter = 1; // Set counter before each test
  });

  afterEach(() => {
    counter = 0; // Reset counter after each test
  });

  it("should start with counter at 1", () => {
    expect(counter).toBe(1);
    counter = 5; // Modify counter
  });

  it("should reset counter for the next test", () => {
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

## Using Suite-Level Hooks

Suite-level hooks run once per test suite, making them perfect for expensive setup operations like creating compositions, importing assets, or initializing project resources.

**Example:**

```typescript
// src/tests/suite-hooks-example.test.ts
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} from "kt-testing-suite-core";

describe("Composition Tests", () => {
  let testComp = null;

  beforeAll(() => {
    // Expensive setup - runs once before all tests
    testComp = app.project.items.addComp(
      "Test Composition",
      1920,
      1080,
      1,
      10,
      30
    );
  });

  afterAll(() => {
    // Cleanup - runs once after all tests
    if (testComp) {
      testComp.remove();
      testComp = null;
    }
  });

  it("should have composition available", () => {
    expect(testComp).not().toBeNull();
    expect(testComp.name).toBe("Test Composition");
  });

  it("should persist composition properties between tests", () => {
    expect(testComp.width).toBe(1920);
    expect(testComp.height).toBe(1080);
    expect(testComp.duration).toBe(10);
  });
});
```

Output:

```
Suite: Composition Tests
  Test: should have composition available
    ✅ Passed
  Test: should persist composition properties between tests
    ✅ Passed

Test Results:
Passed: 2
Failed: 0
```

## Nested Hooks

Hooks can be nested within `describe` blocks. When hooks are nested, they follow a specific execution order:

- **`beforeAll`**: Runs once per suite (no inheritance from parent suites).
- **`afterAll`**: Runs once per suite (no inheritance from parent suites).
- **`beforeEach`**: Outer hooks run before inner hooks (parent → child).
- **`afterEach`**: Inner hooks run before outer hooks (child → parent).

This allows for setting up and tearing down context specific to nested suites while inheriting the setup/teardown from parent suites.

**Example:**

```typescript
// src/tests/hooks-nested-example.test.ts
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "kt-testing-suite-core";

describe("Project Tests", () => {
  let projectComp = null;
  let layerCount = 0;

  beforeAll(() => {
    // Create main composition for all tests
    projectComp = app.project.items.addComp(
      "Project Test Comp",
      1920,
      1080,
      1,
      5,
      30
    );
  });

  afterAll(() => {
    // Clean up main composition
    if (projectComp) {
      projectComp.remove();
    }
  });

  beforeEach(() => {
    layerCount = projectComp.numLayers; // Track layers before each test
  });

  afterEach(() => {
    // Remove any layers added during tests
    while (projectComp.numLayers > layerCount) {
      projectComp.layer(1).remove();
    }
  });

  it("should have project composition available", () => {
    expect(projectComp).not().toBeNull();
    expect(projectComp.name).toBe("Project Test Comp");
  });

  describe("Layer Tests", () => {
    let textLayer = null;

    beforeAll(() => {
      // Add a text layer for layer-specific tests
      textLayer = projectComp.layers.addText("Test Text");
    });

    afterAll(() => {
      // Clean up text layer
      if (textLayer) {
        textLayer.remove();
      }
    });

    it("should have both composition and text layer", () => {
      expect(projectComp).not().toBeNull(); // From outer suite
      expect(textLayer).not().toBeNull(); // From inner suite
      expect(projectComp.numLayers).toBe(1); // Text layer was added
    });
  });
});
```

Output:

```
Suite: Project Tests
  Test: should have project composition available
    ✅ Passed
Suite: Layer Tests
  Test: should have both composition and text layer
    ✅ Passed

Test Results:
Passed: 2
Failed: 0
```

## Hook Reference

### beforeEach

Defines a function to run before each test in the current suite.

**Arguments:**

| Argument | Type       | Description                           |
| -------- | ---------- | ------------------------------------- |
| `fn`     | () => void | Function to execute before each test. |

**Example:**

```typescript
describe("Example Suite", () => {
  beforeEach(() => {
    // Setup code here
  });

  it("should use setup from beforeEach", () => {
    // Test code here
  });
});
```

### afterEach

Defines a function to run after each test in the current suite.

**Arguments:**

| Argument | Type       | Description                          |
| -------- | ---------- | ------------------------------------ |
| `fn`     | () => void | Function to execute after each test. |

**Example:**

```typescript
describe("Example Suite", () => {
  afterEach(() => {
    // Cleanup code here
  });

  it("will be followed by afterEach", () => {
    // Test code here
  });
});
```

### beforeAll

Defines a function to run once before all tests in the current suite.

**Arguments:**

| Argument | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `fn`     | () => void | Function to execute once before all tests. |

**Example:**

```typescript
describe("Example Suite", () => {
  beforeAll(() => {
    // Setup code that runs once
  });

  it("uses setup from beforeAll", () => {
    // Test code here
  });
});
```

### afterAll

Defines a function to run once after all tests in the current suite.

**Arguments:**

| Argument | Type       | Description                               |
| -------- | ---------- | ----------------------------------------- |
| `fn`     | () => void | Function to execute once after all tests. |

**Example:**

```typescript
describe("Example Suite", () => {
  afterAll(() => {
    // Cleanup code that runs once
  });

  it("will be followed by afterAll eventually", () => {
    // Test code here
  });
});
```
