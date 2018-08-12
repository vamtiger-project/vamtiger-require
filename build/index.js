"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vamtiger_regex_period_1 = require("vamtiger-regex-period");
const referenceObjectPath = require('vamtiger-reference-object-path');
const periodCharacter = '.';
function main({ path: requirePath, instancePath, constructorParams, arguments: args, instanceArguments: instanceArgs }) {
    const [filePath, ...objectPaths] = requirePath.split(vamtiger_regex_period_1.regex);
    const objectPath = objectPaths && objectPaths.join(periodCharacter);
    const requiredModule = require(filePath);
    const method = objectPath && referenceObjectPath({
        object: requiredModule,
        path: objectPath
    });
    let result = method || requiredModule;
    let resultFunction;
    if (constructorParams) {
        result = new result(constructorParams);
        if (instancePath) {
            resultFunction = referenceObjectPath({
                object: result,
                path: instancePath
            });
            result = resultFunction.apply(result, instanceArgs || []);
        }
    }
    else if (args && typeof args[args.length - 1] === Type.function)
        result = result.apply(null, args);
    else if (args)
        result = result(args);
    return result;
}
exports.default = main;
var Type;
(function (Type) {
    Type["function"] = "function";
})(Type = exports.Type || (exports.Type = {}));
//# sourceMappingURL=index.js.map