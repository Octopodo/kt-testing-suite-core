// test.ts
import {
    extendMatchers,
    type Matcher,
    Expect,
    expect,
    describe,
    it,
    runTests
} from '../';

// Extensión de matchers y pruebas en un solo archivo
describe('Extend matchers', () => {
    describe('Extend core matchers', () => {
        // Define new core matchers
        const newCoreMatchers: Matcher<any> = {
            toBePositive: function () {
                var safeActual = this.getSafeActual('number');
                this.assert(
                    typeof safeActual === 'number' &&
                        !isNaN(safeActual) &&
                        safeActual > 0,
                    'Expected a positive number but got ' +
                        this.toSafeString(this.actual)
                );
                return this;
            },
            toBeNegative: function () {
                var safeActual = this.getSafeActual('number');
                this.assert(
                    typeof safeActual === 'number' &&
                        !isNaN(safeActual) &&
                        safeActual < 0,
                    'Expected a negative number but got ' +
                        this.toSafeString(this.actual)
                );
                return this;
            }
        };

        // Extend core with new matchers
        function expect<T>(actual: T): Expect<T> & Matcher<T> {
            return extendMatchers(actual, [newCoreMatchers]);
        }

        describe('Happy Path', () => {
            it('extends with toBePositive and passes', () => {
                expect(5).toBePositive();
            });

            it('extends with toBeNegative and passes', () => {
                expect(-5).toBeNegative();
            });

            it('mixes new and core matchers, one succeeds with toPassAny', () => {
                expect(42).toPassAny([
                    'toBePositive',
                    'toBeString',
                    'toBeUndefinedNot'
                ]);
            });
        });

        describe('Grey Path', () => {
            it('passes with toBePositive on zero with not', () => {
                expect(0).not().toBePositive();
            });

            it('passes with toBeNegative on zero with not', () => {
                expect(0).not().toBeNegative();
            });

            it('passes with redundant new and core matchers with toPassAny', () => {
                expect(10).toPassAny([
                    'toBePositive',
                    'toBeNumber',
                    'toBeNegativeNot'
                ]);
            });
        });

        describe('Sad Path', () => {
            it('fails with toBePositive on negative', () => {
                expect(() => expect(-1).toBePositive()).toThrow();
            });

            it('fails with toBeNegative on positive', () => {
                expect(() => expect(5).toBeNegative()).toThrow();
            });

            it('fails with mixed new and core matchers, all fail with toPassAny', () => {
                expect(() =>
                    expect(0).toPassAny([
                        'toBePositive',
                        'toBeNegative',
                        'toBeString'
                    ])
                ).toThrow();
            });
        });
    });
});

//Create your custom matchers
export const customMatchers: Matcher<any> = {
    toBeEvenCustom: function () {
        var safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' &&
                !isNaN(safeActual) &&
                safeActual % 2 === 0,
            'Expected an even number but got ' + this.toSafeString(this.actual)
        );
        return this;
    },
    toBeOdd: function () {
        var safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' &&
                !isNaN(safeActual) &&
                safeActual % 2 !== 0,
            'Expected an odd number but got ' + this.toSafeString(this.actual)
        );
        return this;
    }
};

export const customNestedMatchers: Matcher<any> = {
    toBeEvenNested: function () {
        var safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' &&
                !isNaN(safeActual) &&
                safeActual % 2 === 0,
            'Expected an even number but got ' + this.toSafeString(this.actual)
        );
        return this;
    },
    //Can use same matcher name as parent namespace without conflict
    toBeOdd: function () {
        var safeActual = this.getSafeActual('number');
        this.assert(
            typeof safeActual === 'number' &&
                !isNaN(safeActual) &&
                safeActual % 2 !== 0,
            'Expected an odd number but got ' + this.toSafeString(this.actual)
        );
        return this;
    }
};

//Declare a custom namespace for your new matchers
namespace Custom {
    export function expect<T>(actual: T): Expect<T> & Matcher<T> {
        return extendMatchers(actual, [customMatchers]);
    }

    //You also can create nested namespaces
    export namespace Nested {
        export function expect<T>(actual: T): Expect<T> & Matcher<T> {
            return extendMatchers(actual, [customNestedMatchers]);
        }
    }
}

describe('Add namespaces', () => {
    describe('Custom namespace', () => {
        describe('Happy Path', () => {
            it('passes with Custom.toBeEvenCustom', () => {
                Custom.expect(4).toBeEvenCustom();
            });

            it('mixes Custom and core matchers, one succeeds', () => {
                Custom.expect(2).toPassAny([
                    'toBeEvenCustom',
                    'toBeString',
                    'toBeUndefinedNot'
                ]);
            });
        });

        describe('Grey Path', () => {
            it('passes with Custom.toBeEvenCustom on zero', () => {
                Custom.expect(0).toBeEvenCustom();
            });

            it('passes with redundant Custom and core matchers', () => {
                Custom.expect(4).toPassAny([
                    'toBeEvenCustom',
                    'toBeNumber',
                    'toBeStringNot'
                ]);
            });
        });

        describe('Sad Path', () => {
            it('fails with Custom.toBeEvenCustom on odd', () => {
                expect(() => Custom.expect(3).toBeEvenCustom()).toThrow();
            });

            it('fails with mixed Custom and core matchers, all fail', () => {
                expect(() =>
                    Custom.expect(3).toPassAny([
                        'toBeEvenCustom',
                        'toBeString',
                        'toBeNumberNot'
                    ])
                ).toThrow();
            });
        });
    });

    describe('Custom.Nested namespace', () => {
        describe('Happy Path', () => {
            it('passes with Custom.Nested.toBeEvenNested', () => {
                Custom.Nested.expect(4).toBeEvenNested();
            });

            it('mixes Custom.Nested and core matchers, one succeeds', () => {
                Custom.Nested.expect(2).toPassAny([
                    'toBeEvenNested',
                    'toBeString',
                    'toBeUndefinedNot'
                ]);
            });
        });

        describe('Grey Path', () => {
            it('passes with Custom.Nested.toBeEvenNested on zero', () => {
                Custom.Nested.expect(0).toBeEvenNested();
            });

            it('passes with redundant Custom.Nested and core matchers', () => {
                Custom.Nested.expect(4).toPassAny([
                    'toBeEvenNested',
                    'toBeNumber',
                    'toBeStringNot'
                ]);
            });
            it('can mix parent and nested namespaces', () => {
                Custom.Nested.expect(5).toBeOdd();
                Custom.expect(5).toBeOdd();
            });
        });

        describe('Sad Path', () => {
            it('fails with Custom.Nested.toBeEvenNested on odd', () => {
                expect(() =>
                    Custom.Nested.expect(3).toBeEvenNested()
                ).toThrow();
            });

            it('fails with mixed Custom.Nested and core matchers, all fail', () => {
                expect(() =>
                    Custom.Nested.expect(3).toPassAny([
                        'toBeEvenNested',
                        'toBeString',
                        'toBeNumberNot'
                    ])
                ).toThrow();
            });
        });
    });
});
