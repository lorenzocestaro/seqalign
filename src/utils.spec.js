const { reverse, reduceTracedScores } = require('./utils');
const { TracedScore } = require('./dtypes');

describe('Reverse', () => {
    it.each([
        0,
        -1,
        2,
        -3,
        54,
        -156,
        -89689,
        0.34,
    ])('should reverse the sign of every numeric input', (n) => expect(reverse(n)).toBe(-1 * n));
    it.each(['string', [1, 2, 3], { a: 1, b: 2 }])(
        'should raise TypeError for non number inputs',
        (n) => expect(() => reverse(n)).toThrowError(TypeError),
    );
});

describe('TracedScore reducer', () => {
    it.each([
        [[TracedScore(-1), TracedScore(3), TracedScore(58)], TracedScore(58)],
        [[TracedScore(2), TracedScore(1), TracedScore(0)], TracedScore(2)],
        [[TracedScore(-2), TracedScore(-1), TracedScore(-5)], TracedScore(-1)],
    ])(
        'should return the object in the array with the highest value property',
        (toReduce, expected) => expect(reduceTracedScores(toReduce, -Infinity)).toEqual(expected),
    );
    it.each([
        [[TracedScore(1), TracedScore(-3), TracedScore('4')]],
        [[TracedScore(3), TracedScore(() => {}), TracedScore(13)]],
        [[{ novalue: 3 }]],
    ])('should throw TypeError if supplied with non integer score values', (toReduce) =>
        expect(() => reduceTracedScores(toReduce)).toThrowError(TypeError),
    );
    it.each([
        [[TracedScore(-1), TracedScore(-4), TracedScore(-18)]],
        [[TracedScore(0), TracedScore(0), TracedScore(0)]],
        [[]],
    ])('should default to and object with default score and direction NONE', (toReduce) =>
        expect(reduceTracedScores(toReduce, 0)).toEqual(TracedScore(0)),
    );
    it('should throw TypeError if objects with no value property are supplied', () =>
        expect(() => reduceTracedScores([{ novalue: 3 }])).toThrowError(TypeError));
});
