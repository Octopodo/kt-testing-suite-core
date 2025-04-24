import {
    extendMatchers,
    type Matcher,
    Expect,
    expect,
    describe,
    it,
    beforeEach,
    afterEach,
    runTests
} from '../';

describe('IOMatchers', () => {
    beforeEach(() => {
        
    })
    it('should be able to read a file', () => {
        var file = new File('test.txt');
        expect(file).toBeFile();
        
    })
}