const { directions } = require('./dtypes');

const apply = fn => iterable => iterable.map(fn);

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const reverse = x => -x;

const nanException = () => {
    throw TypeError('Non number input to decreaseAndRectify().');
};

const scoreReducer = (max, score) => {
    if (Number.isInteger(score.value)) {
        return score.value > max.value ? score : max;
    }
    throw TypeError(`Score object as an invalid value property: ${score.value}.`);
};

const reduceScores = scores =>
    scores.reduce(scoreReducer, { value: 0, direction: directions.NONE });

const throwIfNotNumber = x => (Number.isNaN(Number(x)) ? nanException() : x);

module.exports = {
    apply,
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
    reduceScores,
};
