// src/tests/index.test.ts
import { describe, it, expect, runTests, getSuites } from '../index';

describe('JS Matchers Suite', () => {
    describe('Equality and Identity', () => {
        // Happy Path: Identical values and deep equality
        it('toBe passes with identical values', () => {
            expect(true).toBe(true);
            expect(1).toBe(1);
            expect('test').toBe('test');
        });

        it('toEqual passes with deep object equality', () => {
            expect({ a: 1, b: 'test' }).toEqual({ a: 1, b: 'test' });
            expect([1, 2, 3]).toEqual([1, 2, 3]);
        });

        // Grey Path: Similar but not identical values
        it('toBe fails with similar but non-identical values', () => {
            expect(() => expect('1').toBe(1)).toThrow();
            expect(() => expect({ a: 1 }).toBe({ a: 1 })).toThrow();
        });

        it('toEqual passes with nested objects', () => {
            expect({ a: { b: 2 } }).toEqual({ a: { b: 2 } });
        });

        // Sad Path: Invalid or unexpected inputs
        it('toBe handles null and undefined', () => {
            expect(null).toBe(null);
            expect(undefined).toBe(undefined);
            expect(() => expect(null).toBe(undefined)).toThrow();
        });

        it('toEqual handles null and undefined', () => {
            expect(null).toEqual(null);
            expect(() => expect(null).toEqual(undefined)).toThrow();
        });
    });

    describe('Existence and Type', () => {
        // Happy Path: Correct type and existence
        it('toBeDefined passes with defined values', () => {
            expect('test').toBeDefined();
            expect(0).toBeDefined();
        });

        it('toBeUndefined passes with undefined', () => {
            let value;
            expect(value).toBeUndefined();
        });

        it('toBeNull passes with null', () => {
            expect(null).toBeNull();
        });

        it('toBeNumber passes with valid numbers', () => {
            expect(42).toBeNumber();
            expect(0).toBeNumber();
            expect(-5.5).toBeNumber();
        });

        it('toBeNaN passes with NaN', () => {
            expect(NaN).toBeNaN();
        });

        it('toBeString passes with strings', () => {
            expect('hello').toBeString();
            expect('').toBeString();
        });

        it('toBeBoolean passes with booleans', () => {
            expect(true).toBeBoolean();
            expect(false).toBeBoolean();
        });

        it('toBeFunction passes with functions', () => {
            expect(function () {}).toBeFunction();
            expect(() => {}).toBeFunction();
        });

        it('toBeArray passes with arrays', () => {
            expect([]).toBeArray();
            expect([1, 2, 3]).toBeArray();
        });

        // Grey Path: Edge cases or ambiguous inputs
        it('toBeNumber fails with NaN', () => {
            expect(() => expect(NaN).toBeNumber()).toThrow();
        });

        it('toBeNaN passes with invalid number parsing', () => {
            expect(parseInt('invalid')).toBeNaN();
        });

        // Sad Path: Invalid types or unexpected inputs
        it('toBeDefined fails with undefined', () => {
            expect(() => expect(undefined).toBeDefined()).toThrow();
        });

        it('toBeNull fails with non-null', () => {
            expect(() => expect(0).toBeNull()).toThrow();
        });

        it('toBeNumber fails with non-numbers', () => {
            expect(() => expect('42').toBeNumber()).toThrow();
            expect(() => expect(null).toBeNumber()).toThrow();
        });

        it('toBeString fails with non-strings', () => {
            expect(() => expect(123).toBeString()).toThrow();
        });
    });

    describe('Truthiness', () => {
        // Happy Path: Clear truthy and falsy values
        it('toBeTruthy passes with truthy values', () => {
            expect(true).toBeTruthy();
            expect(1).toBeTruthy();
            expect('test').toBeTruthy();
            expect({}).toBeTruthy();
            expect([1]).toBeTruthy();
        });

        it('toBeFalsy passes with falsy values', () => {
            expect(false).toBeFalsy();
            expect(0).toBeFalsy();
            expect('').toBeFalsy();
            expect(null).toBeFalsy();
            expect(undefined).toBeFalsy();
        });

        // Grey Path: Edge cases of truthiness
        it('toBeTruthy passes with non-empty arrays', () => {
            expect([0]).toBeTruthy(); // Array is truthy despite falsy content
        });

        // Sad Path: Unexpected or edge falsy/truthy cases
        it('toBeTruthy fails with falsy values', () => {
            expect(() => expect(0).toBeTruthy()).toThrow();
        });

        it('toBeFalsy fails with truthy values', () => {
            expect(() => expect('non-empty').toBeFalsy()).toThrow();
        });
    });

    describe('Size and Content', () => {
        // Happy Path: Correct size and content
        it('toBeEmpty passes with empty arrays and strings', () => {
            expect([]).toBeEmpty();
            expect('').toBeEmpty();
        });

        it('toHaveLength passes with matching lengths', () => {
            expect([1, 2, 3]).toHaveLength(3);
            expect('abc').toHaveLength(3);
        });

        it('toContain passes with substrings', () => {
            expect('hello world').toContain('world');
            expect('test').toContain('es');
        });

        it('toInclude passes with array elements', () => {
            expect([1, 2, 3]).toInclude(2);
            expect(['a', 'b']).toInclude('a');
        });
        it('toHaveProperty passes with object properties', () => {
            expect({ a: 1, b: 2 }).toHaveProperty('a');
            expect({ a: 1, b: 2 }).toHaveProperty('b');
        });
        it("toHaveProperty passes with object properties and values", () => {
            expect({ a: 1, b: 2 }).toHaveProperty('a', 1);
            expect({ a: 1, b: 2 }).toHaveProperty('b', 2);
        });

        it('toHaveProperty fails with correct property but wrong value', () => {
            expect(() => expect({ a: 1, b: 2 }).toHaveProperty('a', 2)).toThrow();
            expect(() => expect({ a: 1, b: 2 }).toHaveProperty('b', 1)).toThrow();
        });
        // Grey Path: Edge cases of size/content
        it('toBeEmpty passes with null and undefined', () => {
            expect(null).toBeEmpty();
            expect(undefined).toBeEmpty();
        });

        it('toHaveLength passes with zero length for null/undefined', () => {
            expect(null).toHaveLength(0);
            expect(undefined).toHaveLength(0);
        });

        it('toContain fails with partial matches', () => {
            expect(() => expect('hello').toContain('world')).toThrow();
        });
        it('toHaveProperty fails with missing properties', () => {
            expect(() => expect({ a: 1 }).toHaveProperty('b')).toThrow();
        });

        // Sad Path: Invalid or unexpected inputs
        it('toBeEmpty fails with non-empty values', () => {
            expect(() => expect([1]).toBeEmpty()).toThrow();
            expect(() => expect('a').toBeEmpty()).toThrow();
        });

        it('toHaveLength fails with incorrect lengths', () => {
            expect(() => expect('abc').toHaveLength(2)).toThrow();
        });

        it('toInclude fails with non-members', () => {
            expect(() => expect([1, 2]).toInclude(3)).toThrow();
        });

        it('toHaveProperty fails with incorrect properties', () => {
            expect(() => expect({ a: 1 }).toHaveProperty('b')).toThrow();
        });
    });

    describe('Numeric Comparisons', () => {
        // Happy Path: Correct comparisons
        it('toBeGreaterThan passes with greater values', () => {
            expect(5).toBeGreaterThan(3);
            expect(0).toBeGreaterThan(-1);
        });

        it('toBeLessThan passes with lesser values', () => {
            expect(3).toBeLessThan(5);
            expect(-1).toBeLessThan(0);
        });

        it('toBeGreaterThanOrEqual passes with greater or equal values', () => {
            expect(5).toBeGreaterThanOrEqual(3);
            expect(5).toBeGreaterThanOrEqual(5);
        });

        it('toBeLessThanOrEqual passes with lesser or equal values', () => {
            expect(3).toBeLessThanOrEqual(5);
            expect(5).toBeLessThanOrEqual(5);
        });

        // Grey Path: Edge cases of equality
        it('toBeGreaterThan fails with equal values', () => {
            expect(() => expect(5).toBeGreaterThan(5)).toThrow();
        });

        it('toBeLessThan fails with equal values', () => {
            expect(() => expect(5).toBeLessThan(5)).toThrow();
        });

        // Sad Path: Invalid numeric inputs
        it('toBeGreaterThan fails with non-numbers', () => {
            expect(() => expect('5').toBeGreaterThan(3)).toThrow();
            expect(() => expect(null).toBeGreaterThan(0)).toThrow();
        });

        it('toBeLessThan handles NaN', () => {
            expect(() => expect(NaN).toBeLessThan(5)).toThrow();
        });
    });

    describe('Instance Checking', () => {
        class TestClass {
            constructor() {
                let a = 1;
            }
        }

        // Happy Path: Correct instance
        it('toBeInstanceOf passes with correct instance', () => {
            var instance = new TestClass();
            expect(instance).toBeInstanceOf(TestClass);
        });

        // Grey Path: Subclass or similar type
        it('toBeInstanceOf fails with subclass', () => {
            class SubClass extends TestClass {}
            var instance = new SubClass();
            expect(instance).toBeInstanceOf(TestClass); // Should pass in JS, but testing specificity
        });

        // Sad Path: Wrong type or null
        it('toBeInstanceOf fails with wrong type', () => {
            expect(() => expect({}).toBeInstanceOf(TestClass)).toThrow();
            expect(() => expect(null).toBeInstanceOf(TestClass)).toThrow();
        });

        //Works with Adobe built-in classes
        it('toBeInstanceOf passes with built-in classes', () => {
            const comp = app.project.items.addComp(
                'Test',
                1920,
                1080,
                1,
                10,
                30
            );
            expect(comp).toBeInstanceOf(CompItem);
            comp.remove();
        });
    });
    describe('toNotThrow Suite', () => {
        // Happy Path: Function does not throw
        it('passes when function does not throw', () => {
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
        });

        // Sad Path: Function throws an error
        it('fails when function throws', () => {
            expect(() => {
                expect(() => {
                    throw new Error('Test error');
                })
                    .not()
                    .toThrow();
            }).toThrow();
        });

        // Grey Path: Non-function inputs
        it('fails with non-function values', () => {
            expect(() => expect(42).not().toThrow()).toThrow();
            expect(() => expect(null).not().toThrow()).toThrow();
            expect(() => expect(undefined).not().toThrow()).toThrow();
        });

        it('Should combine with other Matchers', () => {
            expect(() => {
                expect(5).toBeNumber();
                expect('hello').toBeString();
            })
                .not()
                .toThrow();
        });
    });
});
