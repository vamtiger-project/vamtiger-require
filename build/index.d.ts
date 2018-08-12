export default function main({ path: requirePath, instancePath, constructorParams, arguments: args, instanceArguments: instanceArgs }: Params): any;
export interface Params {
    path: string;
    constructorParams?: AnyObject;
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
