import { Matcher } from '../core';
import { expect } from '..';

export const IOMatchers: Matcher<any> = {
    toBeFile: function (expected: any) {
        var safeActual: any = this.getSafeActual('any');
        expect(safeActual instanceof File).toBe(true);
        return this;
    },

    toBeFolder: function (expected: any) {
        var safeActual: any = this.getSafeActual('any');
        expect(safeActual instanceof Folder).toBe(true);
        return this;
    },

    toBeFileOrFolder: function (expected: any) {
        var safeActual: any = this.getSafeActual('any');
        expect(safeActual).toPassAny(['toBeFile', 'toBeFolder']);
        return this;
    },

    fileExists: function (expected: any) {
        var safeActual: any = this.getSafeActual('any');
        expect(safeActual).toBeFile();
        expect(safeActual.exists).toBe(true);
        return this;
    }
};
