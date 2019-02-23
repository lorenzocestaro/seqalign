const { TracedScore } = require('./dtypes');

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

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
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
    reduceTracedScores,
};
