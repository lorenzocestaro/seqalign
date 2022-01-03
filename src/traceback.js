const { alignmentUpdaters, coordinateUpdaters } = require('./traceback.utils');
const { directions } = require('./dtypes');

function traceback({ sequence1, sequence2, tracebackMatrix, tracebackStart, gapSymbol }) {
    let [row, col] = tracebackStart;
    const aligned1 = [];
    const aligned2 = [];
    const coordinateWalk = [[row, col]];
    const updaters = alignmentUpdaters(gapSymbol);
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
        alignedSequence1: typeof sequence1 === 'string' ? aligned1.join('') : aligned1,
        alignedSequence2: typeof sequence2 === 'string' ? aligned2.join('') : aligned2,
        coordinateWalk,
    };
}

module.exports = traceback;
