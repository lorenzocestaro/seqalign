const { TracedScore } = require('./dtypes');

const apply = fn => iterable => iterable.map(fn);

const decreaseByOne = number => number - 1;

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const relu = x => Math.max(x, 0);

const reverse = x => -x;

const nanException = () => {
    throw TypeError('Non number input to decreaseAndRectify().');
};

const throwIfNotNumber = x => (Number.isNaN(Number(x)) ? nanException() : x);

const scoreReducer = (max, score) => {
    if (Number.isInteger(score.score)) {
        return score.score > max.score ? score : max;
    }
    throw TypeError(`Score object as an invalid score property: ${score.score}.`);
};

const reduceTracedScores = (scores, defaultScore) =>
    scores.reduce(scoreReducer, TracedScore(defaultScore));

module.exports = {
    apply,
    decreaseAndRectify: pipe(
        decreaseByOne,
        relu,
    ),
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
    reduceTracedScores,
};
