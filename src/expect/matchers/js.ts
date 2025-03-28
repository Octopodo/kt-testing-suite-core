// lib/expect/matchers/js.ts
import { Matcher, Expect } from '../core';

export const jsMatchers: Matcher<any> = {
    toBe: function (expected: any) {
        var safeActual: any = this.getSafeActual('any');
        this.assert(
            safeActual === expected,
            'Expected ' +
                this.toSafeString(expected) +
                ' but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toEqual: function (expected: object) {
        var safeActual: any = this.getSafeActual('any');
        var actualStr = JSON.stringify(safeActual);
        var expectedStr = JSON.stringify(expected);
        this.assert(
            actualStr === expectedStr,
            'Expected ' + expectedStr + ' but got ' + actualStr
        );
        return this;
    },

    toBeDefined: function () {
        this.assert(
            this.actual !== undefined,
            'Expected value to be defined, but got undefined'
        );
        return this;
    },

    toBeUndefined: function () {
        this.assert(
            this.actual === undefined,
            'Expected value to be undefined, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeNull: function () {
        this.assert(
            this.actual === null,
            'Expected value to be null, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeTrue: function () {
        var safeActual: any = this.getSafeActual('any');
        this.assert(
            safeActual === true,
            'Expected value to be true, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeFalse: function () {
        var safeActual: any = this.getSafeActual('any');
        this.assert(
            safeActual === false,
            'Expected value to be false, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeTruthy: function () {
        var safeActual: any = this.getSafeActual('any');
        var isTruthy = !!safeActual;
        this.assert(
            isTruthy,
            'Expected value to be truthy, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeFalsy: function () {
        var safeActual: any = this.getSafeActual('any');
        var isFalsy = !safeActual;
        this.assert(
            isFalsy,
            'Expected value to be falsy, but got ' +
                this.toSafeString(this.actual)
        );
        return this;
    },

    toBeArray: function () {
        var isArray = false;
        if (this.actual && (this.actual as any).constructor === Array) {
            isArray = true;
        }
        this.assert(
            isArray,
            'Expected ' + this.toSafeString(this.actual) + ' to be an array'
        );
        return this;
    },

    toBeEmpty: function () {
        var isArray = false;
        var isString = false;
        if (this.actual && (this.actual as any).constructor === Array) {
            isArray = true;
        }
        if (typeof this.actual === 'string') {
            isString = true;
        }
        // Consider null/undefined as empty (array or string)
        var isArrayOrString =
            isArray ||
            isString ||
            this.actual === null ||
            this.actual === undefined;
        var safeActual: any = this.getSafeActual(isArray ? 'array' : 'string');
        this.assert(
            isArrayOrString && safeActual.length === 0,
            'Expected ' + this.toSafeString(this.actual) + ' to be empty'
        );
        return this;
    },

    toHaveLength: function (expected: number) {
        var isArray = false;
        var isString = false;
        if (this.actual && (this.actual as any).constructor === Array) {
            isArray = true;
        }
        if (typeof this.actual === 'string') {
            isString = true;
        }
        // Consider null/undefined as having length 0
        var isArrayOrString =
            isArray ||
            isString ||
            this.actual === null ||
            this.actual === undefined;
        var safeActual: any = this.getSafeActual(isArray ? 'array' : 'string');
        this.assert(
            isArrayOrString && safeActual.length === expected,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to have length ' +
                expected +
                ' but got ' +
                safeActual.length
        );
        return this;
    },

    toBeNumber: function () {
        var safeActual: any = this.getSafeActual('number');
        var isNumber = false;
        if (typeof this.actual === 'number' && !isNaN(safeActual)) {
            isNumber = true;
        }
        this.assert(
            isNumber,
            'Expected ' + this.toSafeString(this.actual) + ' to be a number'
        );
        return this;
    },

    toBeNaN: function () {
        var safeActual: any = this.getSafeActual('number');
        this.assert(
            isNaN(safeActual),
            'Expected ' + this.toSafeString(this.actual) + ' to be NaN'
        );
        return this;
    },

    toBeString: function () {
        var isString = false;
        if (typeof this.actual === 'string') {
            isString = true;
        }
        this.assert(
            isString,
            'Expected ' + this.toSafeString(this.actual) + ' to be a string'
        );
        return this;
    },

    toBeBoolean: function () {
        var isBoolean = false;
        if (typeof this.actual === 'boolean') {
            isBoolean = true;
        }
        this.assert(
            isBoolean,
            'Expected ' + this.toSafeString(this.actual) + ' to be a boolean'
        );
        return this;
    },

    toBeFunction: function () {
        var isFunction = false;
        if (typeof this.actual === 'function') {
            isFunction = true;
        }
        this.assert(
            isFunction,
            'Expected ' + this.toSafeString(this.actual) + ' to be a function'
        );
        return this;
    },

    toBeGreaterThan: function (expected: number) {
        var safeActual: any = this.getSafeActual('number');
        var isGreater = false;
        if (
            typeof this.actual === 'number' &&
            !isNaN(safeActual) &&
            safeActual > expected
        ) {
            isGreater = true;
        }
        this.assert(
            isGreater,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to be greater than ' +
                expected
        );
        return this;
    },

    toBeLessThan: function (expected: number) {
        var safeActual: any = this.getSafeActual('number');
        var isLess = false;
        if (
            typeof this.actual === 'number' &&
            !isNaN(safeActual) &&
            safeActual < expected
        ) {
            isLess = true;
        }
        this.assert(
            isLess,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to be less than ' +
                expected
        );
        return this;
    },

    toBeGreaterThanOrEqual: function (expected: number) {
        var safeActual: any = this.getSafeActual('number');
        var isGreaterOrEqual = false;
        if (
            typeof this.actual === 'number' &&
            !isNaN(safeActual) &&
            safeActual >= expected
        ) {
            isGreaterOrEqual = true;
        }
        this.assert(
            isGreaterOrEqual,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to be greater than or equal to ' +
                expected
        );
        return this;
    },

    toBeLessThanOrEqual: function (expected: number) {
        var safeActual: any = this.getSafeActual('number');
        var isLessOrEqual = false;
        if (
            typeof this.actual === 'number' &&
            !isNaN(safeActual) &&
            safeActual <= expected
        ) {
            isLessOrEqual = true;
        }
        this.assert(
            isLessOrEqual,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to be less than or equal to ' +
                expected
        );
        return this;
    },

    toContain: function (expected: string) {
        var safeActual: any = this.getSafeActual('string');
        var contains = false;
        if (
            typeof this.actual === 'string' &&
            safeActual.indexOf(expected) !== -1
        ) {
            contains = true;
        }
        this.assert(
            contains,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to contain ' +
                expected
        );
        return this;
    },

    toInclude: function (expected: any) {
        var isArray = false;
        if (this.actual && (this.actual as any).constructor === Array) {
            isArray = true;
        }
        var safeActual: any = this.getSafeActual('array');
        var includes = false;
        if (isArray) {
            for (var i = 0; i < safeActual.length; i++) {
                if (safeActual[i] === expected) {
                    includes = true;
                    break;
                }
            }
        }
        this.assert(
            includes,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to include ' +
                this.toSafeString(expected)
        );
        return this;
    },

    toHaveProperty: function (expected: string) {
        var hasProperty = false;
        if (this.actual && this.actual.hasOwnProperty(expected)) {
            hasProperty = true;
        }
        this.assert(
            hasProperty,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to have property ' +
                expected
        );
        return this;
    },

    toBeInstanceOf: function (expected: Function) {
        // Handle undefined and null explicitly
        if (this.actual === undefined) {
            this.assert(
                false,
                'Expected value to be an instance of ' +
                    (expected.name || 'unknown type') +
                    ', but got undefined'
            );
        }
        if (this.actual === null) {
            this.assert(
                false,
                'Expected value to be an instance of ' +
                    (expected.name || 'unknown type') +
                    ', but got null'
            );
        }

        var isInstance = false;
        // Check constructor for native JS types (Number, String, etc.) and Adobe types (CompItem, Layer, etc.)
        if (
            this.actual &&
            this.actual.constructor &&
            this.actual.constructor === expected
        ) {
            isInstance = true;
        }
        // Fallback: Use instanceof for user-defined classes or edge cases
        else if (this.actual && this.actual instanceof expected) {
            isInstance = true;
        }

        this.assert(
            isInstance,
            'Expected ' +
                this.toSafeString(this.actual) +
                ' to be an instance of ' +
                (expected.name || 'unknown type')
        );
        return this;
    },
    toThrow: function () {
        const isFunction = typeof this.actual === 'function';
        let threw = false;
        if (isFunction) {
            try {
                (this.actual as () => void)();
            } catch (e) {
                threw = true;
            }
        }

        const baseMessage = 'Expected ' + this.toSafeString(this.actual);
        let actionMessage;
        if (this.inverted) {
            actionMessage = ' not to throw an error';
        } else {
            actionMessage = ' to throw an error';
        }
        let resultMessage;
        if (isFunction) {
            if (threw) {
                resultMessage = ', but it did';
            } else {
                resultMessage = ', but it did not';
            }
        } else {
            resultMessage = ', but it was not a function';
        }
        const fullMessage = baseMessage + actionMessage + resultMessage;

        let condition;
        if (this.inverted) {
            condition = !(isFunction && !threw);
        } else {
            condition = isFunction && threw;
        }
        this.assert(condition, fullMessage);
        return this;
    },
    toPassAny: function (conditions: Array<string | Record<string, any>>) {
        if (conditions.length === 0) {
            this.assert(false, 'No conditions provided to toPassAny');
        }
        const errors: string[] = [];
        for (const condition of conditions) {
            let matcherKey: string = '';
            let expectedValues: any;

            if (typeof condition === 'string') {
                matcherKey = condition;
                expectedValues = undefined;
            } else {
                // Es un objeto, usar for...in para obtener la clave y el valor
                for (var key in condition) {
                    matcherKey = key;
                    expectedValues = condition[key];
                    break; // Solo esperamos una propiedad por objeto
                }
            }

            // Detectar si termina en 'Not' usando regex
            const notRegex = /Not$/;
            const isNot = notRegex.test(matcherKey);
            const matcher = isNot
                ? matcherKey.replace(notRegex, '')
                : matcherKey;

            try {
                const expectInstance = isNot ? this.not() : this;
                if (expectedValues === undefined) {
                    (expectInstance as any)[matcher]();
                } else {
                    (expectInstance as any)[matcher](expectedValues);
                }
                return this;
            } catch (e: any) {
                errors.push(e.message);
            }
        }
        throw new Error(`Failed all conditions:\n  - ${errors.join('\n  - ')}`);
    }
};
