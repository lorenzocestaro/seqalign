const { directions: directionsEnum } = require('./dtypes');
const { needlemanWunsch } = require('./nw.core');
const { traceback } = require('./nw.traceback');

const NWAligner = ({
    similarityScoreFunction = (char1, char2) => (char1 === char2 ? 1 : -2),
    inDelScore = -1,
    directions = directionsEnum,
    gapSymbol = '-',
} = {}) => ({
    similarityScoreFunction,
    inDelScore,
    gapSymbol,
    directions,
    align(sequence1 = '', sequence2 = '') {
        const { alignmentScore, scoringMatrix, tracebackMatrix } = needlemanWunsch({
            sequence1,
            sequence2,
            inDelScore: this.inDelScore,
            similarityScoreFunction: this.similarityScoreFunction,
        });
        const { alignedSequence1, alignedSequence2, coordinateWalk } = traceback({
            sequence1,
            sequence2,
            tracebackMatrix,
            gapSymbol: this.gapSymbol,
        });
        return {
            score: alignmentScore,
            originalSequences: [sequence1, sequence2],
            alignedSequences: [alignedSequence1, alignedSequence2],
            coordinateWalk,
            scoringMatrix,
            tracebackMatrix,
            alignment: `${alignedSequence1}\n${alignedSequence2}`,
        };
    },
});

module.exports = NWAligner;
