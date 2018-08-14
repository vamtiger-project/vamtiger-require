
import { resolve as resolvePath } from 'path';
import { expect } from 'chai';
import vamtigerRequire from '../index';
import * as mockData from './mock-data';
import { exists } from 'fs';

const mockDataPath = resolvePath(
    __dirname,
    'mock-data'
);

describe('vamtiger-require: should reference a module', function () {
    it('absolute path', function () {
        const result =  vamtigerRequire({
            path: mockDataPath
        });
        const expected = mockData.default;

        expect(result).to.be.ok;
        expect(result.default).to.equal(expected);
    });

    it('absolute path with object path', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.testObject.test'
        });
        const expected = mockData.testObject.test;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('absolute path with object path - method', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.testObject.nested.method'
        });
        const expected = mockData.testObject.nested.method();

        expect(result).to.be.ok;
        expect(result()).to.equal(expected);
    });

    it('absolute path with object path - method result', function () {
        const args = [1, 2, 3, 4, 5];
        const result =  vamtigerRequire({
            path: mockDataPath + '.testObject.nested.sum',
            arguments: args
        });
        const expected = mockData.testObject.nested.sum(args);

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('absolute path with object path - method result async', function () {
        const args = [1, 2, test];
        const result =  vamtigerRequire({
            path: mockDataPath + '.testObject.nested.sumAsync',
            arguments: args
        });

        function test(error: Error|null|undefined, callbackResult: number) {
            expect(error).to.not.be.ok;
            expect(callbackResult).to.be.ok;
            expect(callbackResult).to.equal(3);
        }
    });

    it('absolute path with object path - Constructor', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.TestClass',
            constructorParams: {
                booya: 'kasha'
            }
        });
        const expected = 'params.booya: kasha';

        expect(result).to.be.ok;
        expect(result.test).to.equal(expected);
    });

    it('absolute path with object path - Constructor: attribute', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.TestClass',
            constructorParams: {
                booya: 'kasha'
            },
            instanceAttribute: 'test'
        });
        const expected = 'params.booya: kasha';

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('absolute path with object path - Constructor: method', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.TestClass',
            instanceMethod: 'sum',
            constructorParams: {},
            instanceArguments: [1, 2, 3, 4, 5]
        });
        const expected = 15;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('absolute path with object path - Constructor: method', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.TestClass',
            instanceMethod: 'sum',
            constructorParams: {},
            instanceArguments: [1, 2, 3, 4, 5]
        });
        const expected = 15;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('absolute path with object path - Constructor: method async', function () {
        const result =  vamtigerRequire({
            path: mockDataPath + '.TestClass',
            instanceMethod: 'sumAsync',
            constructorParams: {},
            instanceArguments: [1, 2, test]
        });

        function test(error: Error|null|undefined, callbackResult: number) {
            expect(error).to.not.be.ok;
            expect(callbackResult).to.be.ok;
            expect(callbackResult).to.equal(3);
        }
    });
})