# VAMTIGER Require
A parameterised module loader.

## Installation
[VAMTIGER Require](https://github.com/vamtiger-project/vamtiger-require) can be installed using [npm](https://www.npmjs.com/) or [yarn]():
```bash
npm i --save vamtiger-require
```
or
```bash
yarn add vamtiger-require
```

## Usage
[Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) or [require](https://nodejs.org/api/modules.html#modules_require) a referece to [VAMTIGER Require](https://github.com/vamtiger-project/vamtiger-require):
```typescript
import { VamtigerRequire } from 'vamtiger-require';
const vamtigerRequire = require('vamtiger-require') as VamtigerRequire;
```
or
```javascript
const vamtigerRequire = require('vamtiger-require');
```

[VAMTIGER Require](https://github.com/vamtiger-project/vamtiger-require) can import a module for a defined path.
```javascript
const importedModule = vamtigerRequire({
    path: mockDataPath
});
```

An attribute or method can be referenced by appending an object path.
```javascript
// path/to/module.js
/*
module.exports = {
    test: {
        attribute: 'test attribute',
        method: () => 'test method,
        sum: (numbers) => numbers.reduce((sum, number) => sum + number, 0),
        sumAsync: (number1, number2, callback) => callback(null, [number1, number2].reduce((sum, number) => sum + number, 0))
    }
}
*/

const attribute =  vamtigerRequire({
    path: 'path/to/module.test.attribute'
}); // 'test attribute'

const method =  vamtigerRequire({
    path: 'path/to/module.test.method'
});
method(); // 'test method'

const sum = vamtigerRequire({
    path: 'path/to/module.test.sum',
    arguments: [1, 2, 3, 4, 5]
}); // 15

const sumAsync = vamtigerRequire({
    path: 'path/to/module.test.sumAsync',
    arguments: [1, 2, handleResult]
});
function handleResult(error, result) {
    console.log(result); // 3
}
```

Classes can be referenced by specifying _*constructorParams*_ and _*instanceArguments*_.
```javascript
// path/to/module.js
/*
module.exports = class TestClass {
    private params: Params;

    constructor(params) {
        this.params = params;
    }

    get test() {
        return this.params.booya;
    }

    sum(...numbers) {
        return numbers.reduce((sum, number) => sum + number, 0);
    }

    sumAsync(number1, number2, callback) {
        callback(null, [number1, number2].reduce((sum, number) => sum + number, 0));
    }
}
*/

const testClass = vamtigerRequire({ // instance of TestClass
    path: 'path/to/module',
    constructorParams: {
        booya: 'kasha'
    }
});
testClass.test; // 'kasha'

const sum =  vamtigerRequire({
    path: 'path/to/module',
    instancePath: 'sum',
    constructorParams: {},
    instanceArguments: [1, 2, 3, 4, 5]
}); // 15

const sumAsync =  vamtigerRequire({
    path: 'path/to/module',
    instancePath: 'sumAsync',
    constructorParams: {},
    instanceArguments: [1, 2, handleResult]
});
function handleResult(error, result) {
    console.log(result); // 3
}
```