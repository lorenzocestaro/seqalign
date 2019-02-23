const { createMatrix, createNWMatrix } = require('./matrix.utils');
const { reduceTracedScores } = require('./utils');
const { TracedScore, directions } = require('./dtypes');

function needlemanWunsch({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = createNWMatrix({ width, heigth });
    const tracebackMatrix = createMatrix({ width, heigth, fill: directions.NONE });

    let lastScore;

    // Fill the matrices.
    for (let row = 1; row < heigth; row += 1) {
        for (let col = 1; col < width; col += 1) {
            // Simlarity score of the current couple of characters in the
            // input sequences. Subtracts 1 from matrix coordinates to account
            // for the matrix buffer.
            const similarityScore = similarityScoreFunction(sequence1[row - 1], sequence2[col - 1]);

            // Candidate scores to fill the current matrix cell.
            const scores = [
                TracedScore(scoringMatrix[row - 1][col] + gapScoreFunction(), directions.TOP),
                TracedScore(scoringMatrix[row][col - 1] + gapScoreFunction(), directions.LEFT),
                TracedScore(scoringMatrix[row - 1][col - 1] + similarityScore, directions.DIAGONAL),
            ];

            // Select highest scoring substitution and fill the matrices.
            const { score: bestScore, direction } = reduceTracedScores(scores, -Infinity);
            scoringMatrix[row][col] = bestScore;
            tracebackMatrix[row][col] = direction;
            lastScore = bestScore;
        }
    }

    return {
        alignmentScore: lastScore,
        scoringMatrix,
        tracebackMatrix,
    };
}

module.exports = needlemanWunsch;
