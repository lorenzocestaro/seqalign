const { alignmentUpdaters, coordinateUpdaters } = require('./traceback.utils');

function traceback({ sequence1, sequence2, tracebackMatrix, tracebackStart, gapSymbol }) {
    let [row, col] = tracebackStart;
    const aligned1 = [];
    const aligned2 = [];
    const coordinateWalk = [[row, col]];
    const updaters = alignmentUpdaters(gapSymbol);
    while (row > 0 || col > 0) {
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

module.exports = traceback;
