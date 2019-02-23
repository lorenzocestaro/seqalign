const { createMatrix, extractColumn, extractRow } = require('./matrix.utils');
const { reduceTracedScores } = require('./utils');
const { TracedScore, directions } = require('./dtypes');

// Takes a portion of scoring matrix (left-row or top-column) and computes the
// length of a gap if the gap is opened at that position.
// Returns the maximum score in the sequence and the maximum gap length.
function computeGapLength(sequence) {
    let max = -1;
    let gapLength = 0;
    for (let cursor = 1; cursor < sequence.length; cursor += 1) {
        if (sequence[cursor] > max) {
            max = sequence[cursor];
            gapLength = cursor;
        }
    }
    return { max, gapLength };
}

// Compute candidate scores to fill a certain cell of the scoring matrix.
// Returns a list of score objects storing score value and traceback direction.
function computeScores({ scoringMatrix, row, col, gapScoreFunction, similarityScore }) {
    // Get left-row and top-column from the current coordinates.
    const leftSequence = extractRow({ matrix: scoringMatrix, row, col });
    const topSequence = extractColumn({ matrix: scoringMatrix, row, col });

    // Compute left and top maximum values and gap lengths.
    const { max: leftMax, gapLength: leftGapLength } = computeGapLength(leftSequence.reverse());
    const { max: topMax, gapLength: topGapLength } = computeGapLength(topSequence.reverse());

    // Compute scores for every type of sustitution for the current
    // coordinates. In the scores array are computed in order:
    //   - Deletion score.
    //   - Insertion score.
    //   - Mutation score.
    return [
        TracedScore(topMax + gapScoreFunction(topGapLength), directions.TOP),
        TracedScore(leftMax + gapScoreFunction(leftGapLength), directions.LEFT),
        TracedScore(scoringMatrix[row - 1][col - 1] + similarityScore, directions.DIAGONAL),
    ];
}

function smithWaterman({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }) {
    // Initialize matrices for dynamic programming solution.
    const heigth = sequence1.length + 1;
    const width = sequence2.length + 1;
    const scoringMatrix = createMatrix({ width, heigth });
    const tracebackMatrix = createMatrix({ width, heigth });

    let highestScore = 0;
    let highestScoreCoordinates = [0, 0];

    // Fill the matrices.
    for (let row = 1; row < heigth; row += 1) {
        for (let col = 1; col < width; col += 1) {
            // Simlarity score of the current couple of characters in the
            // input sequences. Subtracts 1 from matrix coordinates to account
            // for the matrix buffer.
            const similarityScore = similarityScoreFunction(sequence1[row - 1], sequence2[col - 1]);

            // Candidate scores to fill the current matrix cell.
            const scores = computeScores({
                scoringMatrix,
                row,
                col,
                gapScoreFunction,
                similarityScore,
            });

            // Select highest scoring substitution and fill the matrices.
            const { score: bestScore, direction } = reduceTracedScores(scores, 0);
            scoringMatrix[row][col] = bestScore;
            tracebackMatrix[row][col] = direction;

            // Keep record of the highest score in the scoring matrix.
            if (bestScore >= highestScore) {
                highestScore = bestScore;
                highestScoreCoordinates = [row, col];
            }
        }
    }

    return {
        alignmentScore: highestScore,
        startCoordinates: highestScoreCoordinates,
        scoringMatrix,
        tracebackMatrix,
    };
}

module.exports = smithWaterman;
