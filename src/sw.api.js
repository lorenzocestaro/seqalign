const { directions: directionsEnum } = require('./dtypes');
const { smithWaterman } = require('./sw.core');
const { traceback } = require('./sw.traceback');
const { reverse } = require('./utils');

const SWAligner = ({
    similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1),
    gapScoreFunction = reverse,
    directions = directionsEnum,
    gapSymbol = '-',
} = {}) => ({
    similarityScoreFunction,
    gapScoreFunction,
    gapSymbol,
    directions,
    align(sequence1 = '', sequence2 = '') {
        const { alignmentScore, startCoordinates, scoringMatrix, tracebackMatrix } = smithWaterman({
            sequence1,
            sequence2,
            gapScoreFunction: this.gapScoreFunction,
            similarityScoreFunction: this.similarityScoreFunction,
        });
        const { alignedSequence1, alignedSequence2, coordinateWalk } = traceback({
            sequence1,
            sequence2,
            startCoordinates,
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

module.exports = SWAligner;
