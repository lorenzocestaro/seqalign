const { directions } = require('./dtypes');
const { apply, decreaseAndRectify } = require('./utils');

const alignmentUpdaters = gapSymbol => direction => {
    const updaters = {
        [directions.DIAGONAL]: ({ seq1, seq2, row, col }) => [seq1[row - 1], seq2[col - 1]],
        [directions.LEFT]: ({ seq2, col }) => [gapSymbol, seq2[col - 1]],
        [directions.TOP]: ({ seq1, row }) => [seq1[row - 1], gapSymbol],
        [directions.NONE]: ({ seq1, seq2, row, col }) => [
            seq1[row - 1] || gapSymbol,
            seq2[col - 1] || gapSymbol,
        ],
    };
    return updaters[direction];
};

const coordinateUpdaters = direction => {
    const getters = {
        [directions.DIAGONAL]: apply(decreaseAndRectify),
        [directions.LEFT]: ([row, col]) => [row, decreaseAndRectify(col)],
        [directions.TOP]: ([row, col]) => [decreaseAndRectify(row), col],
        [directions.NONE]: apply(decreaseAndRectify),
    };
    return getters[direction];
};

module.exports = {
    alignmentUpdaters,
    coordinateUpdaters,
};
