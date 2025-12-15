import { jsMatchers } from './matchers/js';

/**
 * Base class for handling assertions.
 * @template T - The type of the actual value being tested.
 */
export class Expect<T> {
    protected actual: T;
    protected inverted: boolean;

    /**
     * Creates an instance of Expect.
     * @param actual - The value to be tested.
     * @param inverted - Whether the assertion should be inverted (expect.not).
     */
    constructor(actual: T, inverted: boolean = false) {
        this.actual = actual;
        this.inverted = inverted;
    }

    /**
     * Inverts the assertion logic.
     * @returns The current Expect instance with inverted logic.
     * @example
     * ```typescript
     * expect(1).not().toBe(2);
     * ```
     */
    // Cambiar not() para modificar la instancia existente en lugar de crear una nueva
    not(): Expect<T> & Matcher<T> {
        this.inverted = !this.inverted;
        return this as unknown as Expect<T> & Matcher<T>;
    }

    /**
     * Asserts that a condition is true. If not, throws an error.
     * @param condition - The boolean condition to check.
     * @param message - The error message to throw if the assertion fails.
     * @throws {Error} If the assertion fails.
     */
    protected assert(condition: boolean, message: string): void {
        if (this.inverted ? condition : !condition) {
            throw new Error(message);
        }
    }

    /**
     * Converts a value to a safe string representation for error messages.
     * @param value - The value to convert.
     * @returns A string representation of the value.
     */
    protected toSafeString(value: any): string {
        if (value === null) {
            return 'null';
        }
        if (value === undefined) {
            return 'undefined';
        }
        return value.toString();
    }

    /**
     * Retrieves the actual value in a safe type-checked way.
     * @param type - The expected type ('array', 'string', 'number', 'any').
     * @returns The actual value if it matches the type, or a default value/NaN otherwise.
     */
    protected getSafeActual(type: 'array' | 'string' | 'number' | 'any'): any {
        if (this.actual === null || this.actual === undefined) {
            if (type === 'array') {
                return [];
            }
            if (type === 'string') {
                return '';
            }
            if (type === 'number') {
                return NaN;
            }
            return this.actual;
        }
        if (type === 'array') {
            if (this.actual && (this.actual as any).constructor === Array) {
                return this.actual;
            }
            return [];
        }
        if (type === 'string') {
            if (typeof this.actual === 'string') {
                return this.actual;
            }
            return '';
        }
        if (type === 'number') {
            if (
                typeof this.actual === 'number' &&
                !isNaN(this.actual as number)
            ) {
                return this.actual;
            }
            return NaN;
        }
        return this.actual;
    }
}

/**
 * Interface for Matchers.
 * Matchers are functions that perform assertions on the actual value.
 */
export interface Matcher<T> {
    [key: string]: (expected?: any, ...args: any[]) => Matcher<T>;
}

/**
 * Factory function to create an Expect instance with additional matchers.
 * @template T - The type of the actual value.
 * @param actual - The value to be tested.
 * @param matchers - Optional array of custom matchers to extend the instance.
 * @returns An Expect instance extended with the provided matchers.
 */
export function createExpect<T>(
    actual: T,
    matchers: Matcher<T>[] = []
): Expect<T> & Matcher<T> {
    const expectInstance = new Expect(actual) as Expect<T> & Matcher<T>;
    const fullMatchers =
        matchers.length === 0 ? [jsMatchers] : [jsMatchers].concat(matchers);
    for (var i = 0; i < fullMatchers.length; i++) {
        var matcherGroup = fullMatchers[i];
        for (var key in matcherGroup) {
            if (matcherGroup.hasOwnProperty(key)) {
                expectInstance[key] = matcherGroup[key];
            }
        }
    }

    // Añadir propiedad 'expect' para permitir acceso a otros matchers del mismo namespace
    (expectInstance as any).expect = <U>(newActual: U): Expect<U> & Matcher<U> => 
        createExpect(newActual, matchers);

    return expectInstance;
}

export { createExpect as extendMatchers };
