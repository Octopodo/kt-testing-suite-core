# Extending the KT Testing Suite

The KT Testing Suite allows you to extend its core matchers with custom matchers to suit your testing needs. This guide will walk you through the process of creating and using custom matchers.

## Core Concepts

### Creating Custom Matchers

Custom matchers are functions that you define to extend the capabilities of the `expect` function. Each matcher should follow the structure of existing matchers and use the `assert` method to validate conditions.

```typescript
import { extendMatchers, expect, type Matcher, type Expect } from "../";

const customMatchers: Matcher<any> = {
  toBeEven: function () {
    const safeActual = this.getSafeActual("number");
    this.assert(
      typeof safeActual === "number" && safeActual % 2 === 0,
      `Expected an even number but got ${this.toSafeString(this.actual)}`
    );
    return this;
  },
  toBeOdd: function () {
    const safeActual = this.getSafeActual("number");
    this.assert(
      typeof safeActual === "number" && safeActual % 2 !== 0,
      `Expected an odd number but got ${this.toSafeString(this.actual)}`
    );
    return this;
  },
};
```

### Using `expect` within Custom Matchers

You can also leverage the existing matchers within your custom matchers by using the `expect` function. This allows you to build more complex matchers by combining simpler ones.

```typescript
const advancedMatchers: Matcher<any> = {
  toBeEvenAndPositive: function () {
    expect(this.actual).toBeEven();
    expect(this.actual).toBeTrue();
    return this;
  },
};
```

In this example, the `toBeEvenAndPositive` matcher uses the `toBeEven` matcher to check if the number is even before asserting that it is also positive.

### Example Usage

Here is how you can use the new matcher:

```typescript
CustomMatchers.expect(4).toBeEvenAndPositive(); // Passes
CustomMatchers.expect(-2).toBeEvenAndPositive(); // Fails
```

### Extending the `expect` Function

To use your custom matchers, you need to extend the `expect` function. This can be done by using the `extendMatchers` function.

```typescript
function expect<T>(actual: T): Expect<T> & Matcher<T> {
  return extendMatchers(actual, [customMatchers]);
}
```

### Using Namespaces

You can organize your custom matchers into namespaces to avoid conflicts and improve code readability.

```typescript
namespace CustomMatchers {
  export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return extendMatchers(actual, [customMatchers]);
  }
}
```

## Example Usage

### Basic Example

Here is a simple example of how to use the custom matchers:

```typescript
CustomMatchers.expect(4).toBeEven(); // Passes
CustomMatchers.expect(3).toBeOdd(); // Passes
```

### Nested Namespaces

You can also create nested namespaces for better organization:

```typescript
const nestedMatchers: Matcher<any> = {
  toBePrime: function () {
    const safeActual = this.getSafeActual("number");
    const isPrime = (num: number) => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
      return num > 1;
    };
    this.assert(
      isPrime(safeActual),
      `Expected a prime number but got ${this.toSafeString(this.actual)}`
    );
    return this;
  },
};

namespace CustomMatchers.Nested {
  export function expect<T>(actual: T): Expect<T> & Matcher<T> {
    return extendMatchers(actual, [nestedMatchers]);
  }
}
```

### Using Nested Namespaces

```typescript
CustomMatchers.Nested.expect(5).toBePrime(); // Passes
CustomMatchers.Nested.expect(4).toBePrime(); // Fails
```

## Adobe Type Helpers

When working with Adobe applications (After Effects, Premiere Pro, Illustrator, etc.) in ExtendScript, you may encounter TypeScript compilation errors when accessing properties specific to Adobe objects. This happens because the generic `Matcher<any>` interface doesn't provide type information about Adobe-specific properties.

KT Testing Suite provides two utility functions to handle type assertions safely when working with Adobe objects:

### `asAdobeType<T>(value: any): T`

A type assertion helper that safely converts `any` values to specific Adobe types. This function uses `unknown` as an intermediate step to avoid TypeScript strict type checking errors.

**Parameters:**

- `value: any` - The value to cast to an Adobe type

**Returns:** `T` - The value cast to the specified Adobe type

**Example:**

```typescript
import { asAdobeType } from "kt-testing-suite-core/src/utils/type-helpers";

const customMatchers: Matcher<any> = {
  toBeFootageLayer: function () {
    // Safe type assertion for AVLayer
    const layer = asAdobeType<AVLayer>(this.actual);

    expect(layer).toBeInstanceOf(AVLayer);
    expect(layer.source.mainSource).toBeInstanceOf(FootageSource);
    return this;
  },

  toBeTextLayer: function () {
    // Safe type assertion for TextLayer
    const layer = asAdobeType<TextLayer>(this.actual);

    expect(layer).toBeInstanceOf(TextLayer);
    expect(layer.text.sourceText.value).toBeDefined();
    return this;
  },
};
```

### `isAdobeType<T>(value: any, constructor: new (...args: any[]) => T): value is T`

A type guard function that checks if a value is an instance of a specific Adobe constructor. This is useful for runtime type checking before accessing Adobe-specific properties.

**Parameters:**

- `value: any` - The value to check
- `constructor: new (...args: any[]) => T` - The Adobe constructor to check against

**Returns:** `value is T` - TypeScript type predicate indicating the narrowed type

**Example:**

```typescript
import {
  isAdobeType,
  asAdobeType,
} from "kt-testing-suite-core/src/utils/type-helpers";

const customMatchers: Matcher<any> = {
  toBeValidLayer: function () {
    // Type guard check
    if (!isAdobeType(this.actual, AVLayer)) {
      this.assert(
        false,
        `Expected an AVLayer but got ${this.toSafeString(this.actual)}`
      );
      return this;
    }

    // Now TypeScript knows this.actual is AVLayer
    const layer = asAdobeType<AVLayer>(this.actual);
    expect(layer.source).toBeDefined();
    return this;
  },

  toHaveValidSource: function () {
    // Combined type guard and assertion
    if (!isAdobeType(this.actual, AVLayer)) {
      this.assert(false, "Expected an AVLayer for source validation");
      return this;
    }

    const layer = asAdobeType<AVLayer>(this.actual);
    expect(layer.source).not().toBeNull();
    expect(layer.source.mainSource).toBeDefined();
    return this;
  },
};
```

### Complete Adobe Matchers Example

Here's a comprehensive example showing how to create matchers for After Effects objects:

```typescript
import { Matcher } from "kt-testing-suite-core/src/expect/core";
import {
  asAdobeType,
  isAdobeType,
} from "kt-testing-suite-core/src/utils/type-helpers";

export const adobeMatchers: Matcher<any> = {
  toBeFootageLayer: function () {
    const layer = asAdobeType<AVLayer>(this.actual);
    expect(layer).toBeInstanceOf(AVLayer);
    expect(layer.source.mainSource).toBeInstanceOf(FootageSource);
    return this;
  },

  toBeTextLayer: function () {
    const layer = asAdobeType<TextLayer>(this.actual);
    expect(layer).toBeInstanceOf(TextLayer);
    expect(layer.text).toBeDefined();
    return this;
  },

  toHaveValidSource: function () {
    if (!isAdobeType(this.actual, AVLayer)) {
      this.assert(false, "Expected AVLayer for source validation");
      return this;
    }

    const layer = asAdobeType<AVLayer>(this.actual);
    expect(layer.source).not().toBeNull();
    expect(layer.source.exists).toBe(true);
    return this;
  },

  toBeSolidLayer: function () {
    const layer = asAdobeType<AVLayer>(this.actual);
    expect(layer).toBeInstanceOf(AVLayer);
    expect(layer.source.mainSource).toBeInstanceOf(SolidSource);
    return this;
  },
};
```

### Usage in Tests

```typescript
// Extend expect with Adobe matchers
import { extendMatchers } from "kt-testing-suite-core";
import { adobeMatchers } from "./matchers/adobe-matchers";

const expect = <T>(actual: T) => extendMatchers(actual, [adobeMatchers]);

// Use in tests
describe("After Effects Layer Tests", () => {
  it("should identify footage layers correctly", () => {
    const comp = app.project.items.addComp("Test", 1920, 1080, 1, 10, 30);
    const footage = app.project.importFile(new ImportOptions());
    const layer = comp.layers.add(footage);

    expect(layer).toBeFootageLayer();

    comp.remove();
  });

  it("should validate layer sources", () => {
    const comp = app.project.items.addComp("Test", 1920, 1080, 1, 10, 30);
    const solidLayer = comp.layers.addSolid(
      [1, 0, 0],
      "Red Solid",
      1920,
      1080,
      1
    );

    expect(solidLayer).toHaveValidSource();

    comp.remove();
  });
});
```

### Benefits

- **Type Safety**: Eliminates TypeScript compilation errors when accessing Adobe-specific properties
- **IntelliSense Support**: Provides full autocomplete for Adobe object properties
- **Runtime Safety**: Optional type guards prevent runtime errors
- **Reusable**: Works with any Adobe application (After Effects, Premiere, Illustrator, etc.)
- **Clean Code**: Avoids repetitive `as unknown as T` assertions throughout your matchers

## Conclusion

By following these steps, you can easily extend the KT Testing Suite with custom matchers to fit your specific testing requirements. Organizing matchers into namespaces helps maintain clean and readable code. The Adobe type helpers provide additional type safety when working with Adobe applications in ExtendScript.
