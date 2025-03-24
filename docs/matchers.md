# Matchers Documentation

## Equality and Identity

### `toBe`

Asserts that the actual value is identical to the expected value.

> **Warning:** Two distinct objects with the same properties will not pass this test. Use `toEqual` to compare object properties.

**Examples:**

```typescript
expect(true).toBe(true);
expect(1).toBe(1);
expect('test').toBe('test');
```

### `toEqual`

Asserts that the actual value is deeply equal to the expected value.

**Examples:**

```typescript
expect({ a: 1, b: 'test' }).toEqual({ a: 1, b: 'test' });
expect([1, 2, 3]).toEqual([1, 2, 3]);
```

## Existence and Type

### `toBeDefined`

Asserts that the actual value is defined.

**Examples:**

```typescript
expect('test').toBeDefined();
expect(0).toBeDefined();
```

### `toBeUndefined`

Asserts that the actual value is undefined.

**Examples:**

```typescript
let value;
expect(value).toBeUndefined();
```

### `toBeNull`

Asserts that the actual value is null.

**Examples:**

```typescript
expect(null).toBeNull();
```

### `toBeNumber`

Asserts that the actual value is a number.

**Examples:**

```typescript
expect(42).toBeNumber();
expect(0).toBeNumber();
expect(-5.5).toBeNumber();
```

### `toBeNaN`

Asserts that the actual value is NaN.

**Examples:**

```typescript
expect(NaN).toBeNaN();
expect(parseInt('invalid')).toBeNaN();
```

### `toBeString`

Asserts that the actual value is a string.

**Examples:**

```typescript
expect('hello').toBeString();
expect('').toBeString();
```

### `toBeBoolean`

Asserts that the actual value is a boolean.

**Examples:**

```typescript
expect(true).toBeBoolean();
expect(false).toBeBoolean();
```

### `toBeFunction`

Asserts that the actual value is a function.

**Examples:**

```typescript
expect(function () {}).toBeFunction();
expect(() => {}).toBeFunction();
```

### `toBeArray`

Asserts that the actual value is an array.

**Examples:**

```typescript
expect([]).toBeArray();
expect([1, 2, 3]).toBeArray();
```

## Truthiness

### `toBeTruthy`

Asserts that the actual value is truthy.

**Examples:**

```typescript
expect(true).toBeTruthy();
expect(1).toBeTruthy();
expect('test').toBeTruthy();
expect({}).toBeTruthy();
expect([1]).toBeTruthy();
```

### `toBeFalsy`

Asserts that the actual value is falsy.

**Examples:**

```typescript
expect(false).toBeFalsy();
expect(0).toBeFalsy();
expect('').toBeFalsy();
expect(null).toBeFalsy();
expect(undefined).toBeFalsy();
```

## Size and Content

### `toBeEmpty`

Asserts that the actual value is empty (array or string).

**Examples:**

```typescript
expect([]).toBeEmpty();
expect('').toBeEmpty();
expect(null).toBeEmpty();
expect(undefined).toBeEmpty();
```

### `toHaveLength`

Asserts that the actual value has the expected length.

**Examples:**

```typescript
expect([1, 2, 3]).toHaveLength(3);
expect('abc').toHaveLength(3);
expect(null).toHaveLength(0);
expect(undefined).toHaveLength(0);
```

### `toContain`

Asserts that the actual value contains the expected substring.

**Examples:**

```typescript
expect('hello world').toContain('world');
expect('test').toContain('es');
```

### `toInclude`

Asserts that the actual array includes the expected element.

**Examples:**

```typescript
expect([1, 2, 3]).toInclude(2);
expect(['a', 'b']).toInclude('a');
```

### `toHaveProperty`

Asserts that the actual object has the expected property.

**Examples:**

```typescript
expect({ a: 1, b: 2 }).toHaveProperty('a');
expect({ a: 1, b: 2 }).toHaveProperty('b');
```

## Numeric Comparisons

### `toBeGreaterThan`

Asserts that the actual value is greater than the expected value.

**Examples:**

```typescript
expect(5).toBeGreaterThan(3);
expect(0).toBeGreaterThan(-1);
```

### `toBeLessThan`

Asserts that the actual value is less than the expected value.

**Examples:**

```typescript
expect(3).toBeLessThan(5);
expect(-1).toBeLessThan(0);
```

### `toBeGreaterThanOrEqual`

Asserts that the actual value is greater than or equal to the expected value.

**Examples:**

```typescript
expect(5).toBeGreaterThanOrEqual(3);
expect(5).toBeGreaterThanOrEqual(5);
```

### `toBeLessThanOrEqual`

Asserts that the actual value is less than or equal to the expected value.

**Examples:**

```typescript
expect(3).toBeLessThanOrEqual(5);
expect(5).toBeLessThanOrEqual(5);
```

## Instance Checking

### `toBeInstanceOf`

Asserts that the actual value is an instance of the expected class.

**Examples:**

```typescript
class TestClass {}
var instance = new TestClass();
expect(instance).toBeInstanceOf(TestClass);
```

## Error Handling

### `toThrow`

Asserts that the actual function throws an error.

**Examples:**

```typescript
expect(() => {
    throw new Error('Test error');
}).toThrow();
```

### `not().toThrow`

Asserts that the actual function does not throw an error.

**Examples:**

```typescript
expect(() => {
    return 42;
})
    .not()
    .toThrow();
expect(() => {
    /* Empty function */
})
    .not()
    .toThrow();
```

## Combined Matchers

### `toPassAny`

Asserts that the actual value passes any of the provided conditions.

**Examples:**

```typescript
expect(5).toPassAny(['toBeNumber', { toBeGreaterThan: 3 }]);
```
