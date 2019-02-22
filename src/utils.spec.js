const { apply, reverse, reduceScores } = require('./utils');
const { directions } = require('./dtypes');

describe('Apply', () => {
    it('should return a function', () => {
        const applied = apply(jest.fn());
        expect(applied).toBeInstanceOf(Function);
    });
});

describe('Applied function', () => {
    it('should be called as many times as the items in the iterator', () => {
        const array = [1, 2, 3, 4, 5];
        const fnToApply = jest.fn();
        const applyFn = apply(fnToApply);
        applyFn(array);
        expect(fnToApply).toBeCalledTimes(array.length);
    });
    it('should raise an error when the input argument is not an array', () => {
        const faultyInput = 'string';
        const fnToApply = jest.fn();
        const applyFn = apply(fnToApply);
        expect(() => applyFn(faultyInput)).toThrowError(TypeError);
    });
});

describe('Reverse', () => {
    it.each([0, -1, 2, -3, 54, -156, -89689, 0.34])(
        'should reverse the sign of every numeric input',
        n => expect(reverse(n)).toBe(-1 * n),
    );
    it.each(['string', [1, 2, 3], { a: 1, b: 2 }])(
        'should raise TypeError for non number inputs',
        n => expect(() => reverse(n)).toThrowError(TypeError),
    );
});

describe('Score reducer', () => {
    it.each([
        [[{ score: -1 }, { score: 3 }, { score: 58 }], { score: 58 }],
        [[{ score: 2 }, { score: 1 }, { score: 0 }], { score: 2 }],
        [[{ score: -2 }, { score: -1 }, { score: -5 }], { score: -1 }],
    ])(
        'should return the object in the array with the highest value property',
        (toReduce, expected) => expect(reduceScores(toReduce, -Infinity)).toEqual(expected),
    );
    it.each([
        [[{ score: 1 }, { score: -3 }, { score: '4' }]],
        [[{ score: 3 }, { score: () => {} }, { score: 13 }]],
        [[{ novalue: 3 }]],
    ])('should throw TypeError if supplied with non integer score values', toReduce =>
        expect(() => reduceScores(toReduce)).toThrowError(TypeError),
    );
    it.each([
        [[{ score: -1 }, { score: -4 }, { score: -18 }]],
        [[{ score: 0 }, { score: 0 }, { score: 0 }]],
        [[]],
    ])('should default to and object with default score and direction NONE', toReduce =>
        expect(reduceScores(toReduce, 0)).toEqual({ score: 0, direction: directions.NONE }),
    );
    it('should throw TypeError if objects with no value property are supplied', () =>
        expect(() => reduceScores([{ novalue: 3 }])).toThrowError(TypeError));
});
