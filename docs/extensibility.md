# Extending the KT Testing Suite

The KT Testing Suite allows you to extend its core matchers with custom matchers to suit your testing needs. This guide will walk you through the process of creating and using custom matchers.

## Core Concepts

### Creating Custom Matchers

Custom matchers are functions that you define to extend the capabilities of the `expect` function. Each matcher should follow the structure of existing matchers and use the `assert` method to validate conditions.

```typescript
import { extendMatchers, expect, type Matcher, type Expect } from '../';

const customMatchers: Matcher<any> = {
    toBeEven: function () {
        const safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' && safeActual % 2 === 0,
            `Expected an even number but got ${this.toSafeString(this.actual)}`
        );
        return this;
    },
    toBeOdd: function () {
        const safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' && safeActual % 2 !== 0,
            `Expected an odd number but got ${this.toSafeString(this.actual)}`
        );
        return this;
    }
};
```

### Using `expect` within Custom Matchers

You can also leverage the existing matchers within your custom matchers by using the `expect` function. This allows you to build more complex matchers by combining simpler ones.

```typescript
const advancedMatchers: Matcher<any> = {
    toBeEvenAndPositive: function () {
        const safeActual = this.getSafeActual('number');
        expect(safeActual).toBeEven();
        expect(safeActua > 0).toBeTrue();
        return this;
    }
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
        const safeActual = this.getSafeActual('number');
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
    }
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

## Conclusion

By following these steps, you can easily extend the KT Testing Suite with custom matchers to fit your specific testing requirements. Organizing matchers into namespaces helps maintain clean and readable code.
