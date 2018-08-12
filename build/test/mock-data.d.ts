declare const _default: "default export";
export default _default;
export declare const testObject: {
    test: string;
    nested: {
        attribute: string;
        method: () => string;
        sum: (numbers: number[]) => number;
        sumAsync: (number1: number, number2: number, callback: Callback<number>) => void;
    };
};
export declare class TestClass {
    private params;
    constructor(params: Params);
    readonly test: string;
    sum(...numbers: number[]): number;
    sumAsync(number1: number, number2: number, callback: Callback<number>): void;
}
export interface Params {
    booya: string;
}
export declare type Callback<T> = (error: Error | null | undefined, t: T) => void;
