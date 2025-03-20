// lib/expect/matchers/aftereffects.ts
import { Matcher } from '../core';

// Asumimos que CompItem está definido en tus tipos de Adobe
export const afterEffectsMatchers: Matcher<CompItem> = {
    toBeActiveComp: function () {
        this.assert(
            this.actual instanceof CompItem &&
                app.project.activeItem === this.actual,
            'Expected ' +
                (this.actual instanceof CompItem
                    ? this.actual.name
                    : 'unknown') +
                ' to be the active composition, but it is not'
        );
        return this;
    },

    toHaveDuration: function (expected: number) {
        var actualDuration =
            this.actual instanceof CompItem
                ? this.actual.duration
                : 'undefined';
        this.assert(
            this.actual instanceof CompItem &&
                this.actual.duration === expected,
            'Expected duration ' + expected + ' but got ' + actualDuration
        );
        return this;
    },

    toBeComp: function () {
        this.assert(
            this.actual && this.actual.toString() === '[object CompItem]',
            'Expected ' + this.actual.toString() + ' to be a composition'
        );
        return this;
    }
};
