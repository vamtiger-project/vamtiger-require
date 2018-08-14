export default function main({ path: requirePath, constructorParams, arguments: args, instanceArguments: instanceArgs, instanceAttribute, instanceMethod, instancePath }: Params): any;
export interface Params {
    path: string;
    constructorParams?: AnyObject;
    instanceAttribute?: string;
    instanceMethod?: string;
    instancePath?: string;
    arguments?: any[];
    instanceArguments?: any[];
}
export declare enum Type {
    function = "function"
}
export declare type AnyObject = {
    [key: string]: any;
};
export declare type VamtigerRequire = typeof main;
