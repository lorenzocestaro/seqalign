const { directions } = require('./dtypes');

const alignmentUpdaters = (gapSymbol) => (direction) => {
    const updaters = {
        [directions.DIAGONAL]: ({ seq1, seq2, row, col }) => [seq1[row - 1], seq2[col - 1]],
        [directions.LEFT]: ({ seq2, col }) => [gapSymbol, seq2[col - 1]],
        [directions.TOP]: ({ seq1, row }) => [seq1[row - 1], gapSymbol],
    };
    return updaters[direction];
};

const coordinateUpdaters = (direction) => {
    const getters = {
        [directions.DIAGONAL]: ([row, col]) => [row - 1, col - 1],
        [directions.LEFT]: ([row, col]) => [row, col - 1],
        [directions.TOP]: ([row, col]) => [row - 1, col],
    };
    return getters[direction];
};

module.exports = {
    alignmentUpdaters,
    coordinateUpdaters,
};
