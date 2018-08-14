import { resolve as resolvePath } from 'path';

export const mockDataPath = __filename.replace('.js', '');

export const requireArguments = [
    'argument1',
    'argument2',
    'argument3'
].map(arg => `${mockDataPath}.testObject.${arg}`);

export const callbackPath = `${mockDataPath}.callback`;

export default 'default export';

export const testObject = {
    test: 'test',
    nested: {
        attribute: 'test attribute',
        method: () => 'test method',
        sum: (numbers: number[]) => numbers.reduce((sum, number) => sum + number, 0),
        sumAsync: (number1: number, number2: number, callback: Callback<number>) => callback(null, [number1, number2].reduce((sum, number) => sum + number, 0))
    },
    argument1: 1,
    argument2: 2,
    argument3: 3
};

export function callback(error: Error, result: number) {
    if (error)
        throw error;

    return result;
}

export class TestClass {
    private params: Params;

    constructor(params: Params) {
        this.params = params;
    }

    get test() {
        return `params.booya: ${this.params.booya}`;
    }

    sum(...numbers: number[]) {
        return numbers.reduce((sum, number) => sum + number, 0);
    }

    sumAsync(number1: number, number2: number, callback: Callback<number>) {
        return callback(null, [number1, number2].reduce((sum, number) => sum + number, 0));
    }
}

export interface Params {
    booya: string;
}

export type Callback<T> = (error: Error|null|undefined, t: T) => void;