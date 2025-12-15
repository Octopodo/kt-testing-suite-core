import { describe, it, expect, throwError } from '../index';

describe('throwError Utility', () => {
    // Happy Path: Throws with a standard message
    it('throws an error with the provided message', () => {

        expect(() => throwError('Test error message')).toThrow();
    });

    // Sad Path: Throws with an empty message
    it('throws an error with an empty message', () => {
        expect(() => throwError('')).toThrow();
    });

    // Corner Case: Throws with a message containing special characters
    it('throws an error with special characters in the message', () => {
        expect(() => throwError('Error with special chars: !@#$%^&*()')).toThrow();
    });

    // Corner Case: Throws with a very long message
    it('throws an error with a long message', () => {
        const longMessage = 'This is a very long error message that should test how the runner handles lengthy output in the failure report.';
        expect(() => throwError(longMessage)).toThrow();
    });
    it('should not run subsequent expects after throwError', () => {
        expect(() => {
            throwError('This error should stop further execution');
            // This line should not be reached
            $.writeln('This line should not execute');
            expect(true).toBe(false);
        }).toThrow('This error should stop further execution');
    });
});
