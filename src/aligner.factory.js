const traceback = require('./traceback');

const AlignerFactory = ({
    algorithm,
    similarityScoreFunctionDefault,
    gapScoreFunctionDefault,
    directionsDefault,
    gapSymbolDefault,
}) => ({
    similarityScoreFunction = similarityScoreFunctionDefault,
    gapScoreFunction = gapScoreFunctionDefault,
    directions = directionsDefault,
    gapSymbol = gapSymbolDefault,
} = {}) => ({
    similarityScoreFunction,
    gapScoreFunction,
    gapSymbol,
    directions,
    align(sequence1 = '', sequence2 = '') {
        const { alignmentScore, scoringMatrix, tracebackMatrix, tracebackStart } = algorithm({
            sequence1,
            sequence2,
            gapScoreFunction: this.gapScoreFunction,
            similarityScoreFunction: this.similarityScoreFunction,
            directions: this.directions,
        });
        const { alignedSequence1, alignedSequence2, coordinateWalk } = traceback({
            sequence1,
            sequence2,
            tracebackMatrix,
            tracebackStart,
            gapSymbol: this.gapSymbol,
            directions: this.directions,
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

module.exports = AlignerFactory;
