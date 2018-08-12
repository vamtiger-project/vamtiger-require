"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chai_1 = require("chai");
const index_1 = require("../index");
const mockData = require("./mock-data");
const mockDataPath = path_1.resolve(__dirname, 'mock-data');
describe('vamtiger-require: should reference a module', function () {
    it('absolute path', function () {
        const result = index_1.default({
            path: mockDataPath
        });
        const expected = mockData.default;
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result.default).to.equal(expected);
    });
    it('absolute path with object path', function () {
        const result = index_1.default({
            path: mockDataPath + '.testObject.test'
        });
        const expected = mockData.testObject.test;
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result).to.equal(expected);
    });
    it('absolute path with object path - method', function () {
        const result = index_1.default({
            path: mockDataPath + '.testObject.nested.method'
        });
        const expected = mockData.testObject.nested.method();
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result()).to.equal(expected);
    });
    it('absolute path with object path - method result', function () {
        const args = [1, 2, 3, 4, 5];
        const result = index_1.default({
            path: mockDataPath + '.testObject.nested.sum',
            arguments: args
        });
        const expected = mockData.testObject.nested.sum(args);
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result).to.equal(expected);
    });
    it('absolute path with object path - method result async', function () {
        const args = [1, 2, test];
        const result = index_1.default({
            path: mockDataPath + '.testObject.nested.sumAsync',
            arguments: args
        });
        function test(error, callbackResult) {
            chai_1.expect(error).to.not.be.ok;
            chai_1.expect(callbackResult).to.be.ok;
            chai_1.expect(callbackResult).to.equal(3);
        }
    });
    it('absolute path with object path - Constructor', function () {
        const result = index_1.default({
            path: mockDataPath + '.TestClass',
            constructorParams: {
                booya: 'kasha'
            }
        });
        const expected = 'params.booya: kasha';
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result.test).to.equal(expected);
    });
    it('absolute path with object path - Constructor: method', function () {
        const result = index_1.default({
            path: mockDataPath + '.TestClass',
            instancePath: 'sum',
            constructorParams: {},
            instanceArguments: [1, 2, 3, 4, 5]
        });
        const expected = 15;
        chai_1.expect(result).to.be.ok;
        chai_1.expect(result).to.equal(expected);
    });
    it('absolute path with object path - Constructor: method async', function () {
        const result = index_1.default({
            path: mockDataPath + '.TestClass',
            instancePath: 'sumAsync',
            constructorParams: {},
            instanceArguments: [1, 2, test]
        });
        function test(error, callbackResult) {
            chai_1.expect(error).to.not.be.ok;
            chai_1.expect(callbackResult).to.be.ok;
            chai_1.expect(callbackResult).to.equal(3);
        }
    });
});
//# sourceMappingURL=01-require.js.map