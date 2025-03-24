import { expect, describe, it } from '../expect';

describe('Tests for toPassAny', () => {
    // Happy Path: Cases where it’s expected to pass
    describe('Happy Path', () => {
        it('passes with a single matcher with expected that succeeds', () => {
            expect(5).toPassAny([{ toBe: 5 }]);
        });

        it('passes with a single matcher with array expected that succeeds', () => {
            expect(5).toPassAny([{ toBe: 5 }]);
        });

        it('passes with a single string matcher that succeeds', () => {
            expect(5).toPassAny(['toBeNumber']);
        });

        it('passes with a single string matcher with not that succeeds', () => {
            expect(5).toPassAny(['toBeUndefinedNot']);
        });

        it('passes with multiple matchers, first one with expected succeeds', () => {
            expect(5).toPassAny([{ toBe: 5 }, { toBe: 10 }, 'toBeUndefined']);
        });

        it('passes with multiple matchers, middle string matcher succeeds', () => {
            expect('hello').toPassAny([
                { toBe: [10] },
                'toBeString',
                'toBeUndefined'
            ]);
        });

        it('passes with multiple matchers, last string matcher with not succeeds', () => {
            expect(42).toPassAny([
                { toBe: 5 },
                'toBeString',
                'toBeUndefinedNot'
            ]);
        });

        it('passes with mix of string and object matchers, one succeeds', () => {
            expect({ key: 'value' }).toPassAny([
                { toBeNot: 5 },
                'toBeString',
                'toBeUndefinedNot'
            ]);
        });
    });

    // Grey Path: Edge cases that should still work
    describe('Grey Path', () => {
        it('passes with a single string matcher on undefined', () => {
            expect(undefined).toPassAny(['toBeUndefined']);
        });

        it('passes with a single string matcher with not on null', () => {
            expect(null).toPassAny(['toBeNumberNot']);
        });

        it('passes with multiple matchers, only one string matcher succeeds', () => {
            expect(5).toPassAny([
                { toBe: [10] },
                'toBeString',
                'toBeNumber',
                'toBeUndefined'
            ]);
        });

        it('passes with redundant succeeding matchers including not', () => {
            expect(42).toPassAny([
                { toBe: 42 },
                'toBeNumber',
                'toBeStringNot',
                'toBeUndefinedNot'
            ]);
        });

        it('passes with complex object comparison', () => {
            const obj = { key: 'value' };
            expect(obj).toPassAny([
                { toBeEqual: { key: 'value' } },
                'toBeStringNot'
            ]);
        });
    });

    // Sad Path: Cases where it’s expected to fail
    describe('Sad Path', () => {
        it('fails with no conditions provided', () => {
            expect(() => expect(5).toPassAny([])).toThrow();
        });

        it('fails with a single matcher with expected that doesn’t succeed', () => {
            expect(() => expect(5).toPassAny([{ toBe: 10 }])).toThrow();
        });

        it('fails with a single matcher with array expected that doesn’t succeed', () => {
            expect(() => expect(5).toPassAny([{ toBe: [10] }])).toThrow();
        });

        it('fails with a single string matcher that doesn’t succeed', () => {
            expect(() => expect(undefined).toPassAny(['toBeNumber'])).toThrow();
        });

        it('fails with a single string matcher with not that doesn’t succeed', () => {
            expect(() =>
                expect(undefined).toPassAny(['toBeUndefinedNot'])
            ).toThrow();
        });

        it('fails with multiple matchers, all fail', () => {
            expect(() =>
                expect(3).toPassAny([
                    { toBe: 5 },
                    'toBeString',
                    'toBeUndefined'
                ])
            ).toThrow();
        });

        it('fails with multiple matchers including not, all fail', () => {
            expect(() =>
                expect('hello').toPassAny([
                    { toBe: 5 },
                    'toBeNumber',
                    'toBeStringNot'
                ])
            ).toThrow();
        });

        it('fails with mix of string and object matchers, all fail', () => {
            expect(() =>
                expect(null).toPassAny([
                    { toBe: 5 },
                    'toBeNumber',
                    'toBeNullNot'
                ])
            ).toThrow();
        });
    });
});
