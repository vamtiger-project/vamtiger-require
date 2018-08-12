import { regex as period } from 'vamtiger-regex-period';
import { ReferenceObjectPath } from 'vamtiger-reference-object-path';

const referenceObjectPath = require('vamtiger-reference-object-path') as ReferenceObjectPath;

const periodCharacter = '.';

export default function main({ path: requirePath, instancePath, constructorParams, arguments: args, instanceArguments: instanceArgs }: Params) {
    const [filePath, ...objectPaths] = requirePath.split(period);
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
    } else if (args && typeof args[args.length - 1] === Type.function)
        result = result.apply(null, args);
    else if (args)
        result = result(args);

    return result;
}

export interface Params {
    path: string;
    constructorParams?: AnyObject;
    instancePath?: string;
    arguments?: any[];
    instanceArguments?: any[];
}

export enum Type {
    function = 'function'
}

export type AnyObject = {
    [key: string]: any;
}

export type VamtigerRequire = typeof main;