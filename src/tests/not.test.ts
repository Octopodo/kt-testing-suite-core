import { describe, it, expect } from '../index';

describe('Not Namespace Suite', () => {
    // Happy Path: not inverts passing matchers to failing
    it('not.toBeNumber fails for numbers', () => {
        expect(() => expect(42).not().toBeNumber()).toThrow();
        expect(() => expect(-5.5).not().toBeNumber()).toThrow();
    });

    // Sad Path: not inverts failing matchers to passing
    it('not.toBeNumber passes for non-numbers', () => {
        expect('hello').not().toBeNumber();
        expect(null).not().toBeNumber();
    });

    // Grey Path: Test with other matchers
    it('not.toBe passes for non-matching values', () => {
        expect(5).not().toBe(10);
        expect('test').not().toBe('other');
    });

    it('not.toBeInstanceOf works with types', () => {
        expect('hello').not().toBeInstanceOf(Number);
        expect(undefined).not().toBeInstanceOf(Object);
    });
});
