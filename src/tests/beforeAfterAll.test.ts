import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '../';

describe('beforeAll and afterAll hooks', () => {
    let suiteSetup = false;
    let testCounter = 0;

    beforeAll(() => {
        suiteSetup = true;
    });

    afterAll(() => {
        suiteSetup = false;
    });

    beforeEach(() => {
        testCounter++;
    });

    it('should run beforeAll once before all tests', () => {
        expect(suiteSetup).toBe(true);
        expect(testCounter).toBe(1);
    });

    it('should not run beforeAll again for second test', () => {
        expect(suiteSetup).toBe(true); // Still true from beforeAll
        expect(testCounter).toBe(2); // beforeEach ran again
    });

    describe('nested suite', () => {
        let nestedSetup = false;

        beforeAll(() => {
            nestedSetup = true;
        });

        afterAll(() => {
            nestedSetup = false;
        });

        it('should inherit parent beforeAll and run nested beforeAll', () => {
            expect(suiteSetup).toBe(true); // From parent
            expect(nestedSetup).toBe(true); // From nested  
            expect(testCounter).toBe(4); // beforeEach has run 4 times: test1, test2, test3(parent), and now this nested test
        });
    });

    it('should continue after nested suite', () => {
        expect(suiteSetup).toBe(true); // Parent beforeAll still active
        expect(testCounter).toBe(3); // beforeEach has run 3 times: test1, test2, and now this test (nested suite runs after)
    });
});

describe('beforeAll and afterAll error handling', () => {
    let setupRan = false;
    let cleanupRan = false;

    beforeAll(() => {
        setupRan = true;
        throw new Error('Setup failed');
    });

    afterAll(() => {
        cleanupRan = true;
    });

    it('should run test even if beforeAll throws', () => {
        expect(setupRan).toBe(true); // beforeAll executed despite error
        expect(true).toBe(true); // Test should still run
    });
});

describe('shared resource management', () => {
    let sharedResource: { data: string[]; initialized: boolean } | null = null;

    beforeAll(() => {
        sharedResource = {
            data: ['initial'],
            initialized: true
        };
    });

    afterAll(() => {
        sharedResource = null;
    });

    it('should have access to shared resource', () => {
        expect(sharedResource).not().toBeNull();
        expect(sharedResource!.initialized).toBe(true);
        expect(sharedResource!.data).toHaveLength(1);
        
        // Modify shared resource
        sharedResource!.data.push('test1');
    });

    it('should see modifications from previous test', () => {
        expect(sharedResource).not().toBeNull();
        expect(sharedResource!.data).toHaveLength(2);
        expect(sharedResource!.data[1]).toBe('test1');
    });
});

describe('execution order verification', () => {
    let executionOrder: string[] = [];

    beforeAll(() => {
        executionOrder.push('beforeAll');
    });

    afterAll(() => {
        executionOrder.push('afterAll');
    });

    beforeEach(() => {
        executionOrder.push('beforeEach');
    });

    afterEach(() => {
        executionOrder.push('afterEach');
    });

    it('should execute hooks in correct order', () => {
        executionOrder.push('test1');
        // At this point we should have: beforeAll, beforeEach, test1
        expect(executionOrder.length).toBe(3);
        expect(executionOrder[0]).toBe('beforeAll');
        expect(executionOrder[1]).toBe('beforeEach');
        expect(executionOrder[2]).toBe('test1');
    });

    it('should maintain execution order pattern', () => {
        executionOrder.push('test2');
        // At this point we should have: beforeAll, beforeEach, test1, afterEach, beforeEach, test2
        expect(executionOrder.length).toBe(6);
        expect(executionOrder[3]).toBe('afterEach'); // From previous test
        expect(executionOrder[4]).toBe('beforeEach'); // For this test
        expect(executionOrder[5]).toBe('test2');
        
        // beforeAll should only appear once
        let beforeAllCount = 0;
        for (let i = 0; i < executionOrder.length; i++) {
            if (executionOrder[i] === 'beforeAll') {
                beforeAllCount++;
            }
        }
        expect(beforeAllCount).toBe(1);
    });
});