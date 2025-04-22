import { describe, it, expect, beforeEach, afterEach } from '../';

describe('beforeEach and afterEach hooks', () => {
    let counter = 0;

    beforeEach(() => {
        counter += 1; // Increment counter before each test
    });

    afterEach(() => {
        counter = 0; // Reset counter after each test
    });

    it('should run beforeEach before the test', () => {
        expect(counter).toBe(1); // Counter should be incremented by beforeEach
    });

    it('should reset counter after each test using afterEach', () => {
        expect(counter).toBe(1); // Counter should be reset and incremented again
    });

    describe('nested describe block', () => {
        beforeEach(() => {
            counter += 10; // Add 10 in nested beforeEach
        });

        afterEach(() => {
            counter -= 10; // Subtract 10 in nested afterEach
        });

        it('should inherit hooks from parent and run nested hooks', () => {
            expect(counter).toBe(11); // Parent beforeEach + nested beforeEach
        });
    });
});
