const { directions } = require('./dtypes');

const coordinateUpdaters = direction => {
    const getters = {
        [directions.DIAGONAL]: ([row, col]) => [row - 1, col - 1],
        [directions.LEFT]: ([row, col]) => [row, col - 1],
        [directions.TOP]: ([row, col]) => [row - 1, col],
    };
    return getters[direction];
};

const alignmentUpdaters = gapSymbol => direction => {
    const updaters = {
        [directions.DIAGONAL]: ({ seq1, seq2, row, col }) => [seq1[row - 1], seq2[col - 1]],
        [directions.LEFT]: ({ seq2, col }) => [gapSymbol, seq2[col - 1]],
        [directions.TOP]: ({ seq1, row }) => [seq1[row - 1], gapSymbol],
    };
    return updaters[direction];
};

function traceback({ sequence1, sequence2, tracebackMatrix, startCoordinates, gapSymbol }) {
    let [row, col] = startCoordinates;
    const aligned1 = [];
    const aligned2 = [];
    const coordinateWalk = [[row, col]];
    const updaters = alignmentUpdaters(gapSymbol);
    console.log(tracebackMatrix)
    while (tracebackMatrix[row][col] !== directions.NONE) {
        const direction = tracebackMatrix[row][col];
        const alignmentUpdater = updaters(direction);
        const [char1, char2] = alignmentUpdater({ seq1: sequence1, seq2: sequence2, row, col });
        aligned1.unshift(char1);
        aligned2.unshift(char2);
        const coordinateUpdater = coordinateUpdaters(direction);
        [row, col] = coordinateUpdater([row, col]);
        coordinateWalk.push([row, col]);
    }
    return {
        alignedSequence1: aligned1.join(''),
        alignedSequence2: aligned2.join(''),
        coordinateWalk,
    };
}

module.exports = {
    traceback,
};
