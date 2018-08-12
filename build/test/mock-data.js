"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 'default export';
exports.testObject = {
    test: 'test',
    nested: {
        attribute: 'test attribute',
        method: () => 'test method',
        sum: (numbers) => numbers.reduce((sum, number) => sum + number, 0),
        sumAsync: (number1, number2, callback) => callback(null, [number1, number2].reduce((sum, number) => sum + number, 0))
    }
};
class TestClass {
    constructor(params) {
        this.params = params;
    }
    get test() {
        return `params.booya: ${this.params.booya}`;
    }
    sum(...numbers) {
        return numbers.reduce((sum, number) => sum + number, 0);
    }
    sumAsync(number1, number2, callback) {
        callback(null, [number1, number2].reduce((sum, number) => sum + number, 0));
    }
}
exports.TestClass = TestClass;
//# sourceMappingURL=mock-data.js.map