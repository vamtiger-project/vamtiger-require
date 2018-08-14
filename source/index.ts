import { regex as period } from 'vamtiger-regex-period';
import { ReferenceObjectPath } from 'vamtiger-reference-object-path';

const referenceObjectPath = require('vamtiger-reference-object-path') as ReferenceObjectPath;

const periodCharacter = '.';

export default function main({ path: requirePath, constructorParams, arguments: args, instanceArguments: instanceArgs, instanceAttribute, instanceMethod, instancePath, requireArguments }: Params) {
    const [filePath, ...objectPaths] = requirePath.split(period);
    const objectPath = objectPaths && objectPaths.join(periodCharacter);
    const requiredModule = require(filePath);
    const method = objectPath && referenceObjectPath({
        object: requiredModule,
        path: objectPath
    });

    let result = method || requiredModule;
    let resultFunction;

    instanceMethod = instanceMethod || instancePath;
    args = requireArguments && getRequiredArguments({ requireArguments }) || args;

    if (constructorParams) {
        result = new result(constructorParams);

        if (instanceMethod) {
            resultFunction = referenceObjectPath({
                object: result,
                path: instanceMethod
            });

            result = resultFunction.apply(result, args || []);
        } else if (instanceAttribute)
            result = result[instanceAttribute];
    } else if (args && typeof args[args.length - 1] === Type.function)
        result = result.apply(null, args);
    else if (args)
        result = result(args);

    return result;
}

function getRequiredArguments({ requireArguments }: GetRequiredArgumentsParams) {
    const requiredArguments = requireArguments
        .map(argument => typeof argument === 'string' ? { path: argument } : argument)
        .map(main);

    return requiredArguments;
}

export interface Params {
    path: string;
    constructorParams?: AnyObject;
    instanceAttribute?: string;
    instanceMethod?: string;
    instancePath?: string; // alias for instanceMethod
    arguments?: any[];
    requireArguments?: string[];
    instanceArguments?: any[];
}

interface GetRequiredArgumentsParams {
    requireArguments: Params['requireArguments'];
}

export enum Type {
    function = 'function'
}

export type AnyObject = {
    [key: string]: any;
}

export type VamtigerRequire = typeof main;