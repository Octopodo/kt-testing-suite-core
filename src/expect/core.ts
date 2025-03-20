export class Expect<T> {
    protected actual: T;
    protected inverted: boolean;

    constructor(actual: T, inverted: boolean = false) {
        this.actual = actual;
        this.inverted = inverted;
    }

    // Cambiar not() para modificar la instancia existente en lugar de crear una nueva
    not(): Expect<T> & Matcher<T> {
        this.inverted = !this.inverted;
        return this as unknown as Expect<T> & Matcher<T>;
    }

    protected assert(condition: boolean, message: string): void {
        if (this.inverted ? condition : !condition) {
            throw new Error(message);
        }
    }

    protected toSafeString(value: any): string {
        if (value === null) {
            return 'null';
        }
        if (value === undefined) {
            return 'undefined';
        }
        return value.toString();
    }

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

export interface Matcher<T> {
    [key: string]: (expected?: any, ...args: any[]) => void;
}

export function createExpect<T>(
    actual: T,
    matchers: Matcher<T>[] = []
): Expect<T> & Matcher<T> {
    const expectInstance = new Expect(actual) as Expect<T> & Matcher<T>;

    for (var i = 0; i < matchers.length; i++) {
        var matcherGroup = matchers[i];
        for (var key in matcherGroup) {
            if (matcherGroup.hasOwnProperty(key)) {
                expectInstance[key] = matcherGroup[key];
            }
        }
    }

    return expectInstance;
}
