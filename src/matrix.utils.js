const { directions } = require('./dtypes');

// Creates a matrix of the specified width and length.
// First row and column are filled with a negative integer progression starting
// from 0 ar coordinates (0, 0). The remaining cells are filled with zeros.
const initNWScoringMatrix = ({ width, heigth }) => {
    const matrix = [];
    for (let row = 0; row < heigth; row += 1) {
        if (row === 0) {
            matrix[row] = Array(width)
                .fill()
                .map((_, i) => -i || 0);
        } else {
            matrix[row] = Array(width).fill(0);
            matrix[row][0] = -row;
        }
    }
    return matrix;
};

// Creates a matrix of the specified width and length.
// The top row buffer is filled with the value for directions.LEFT.
// The left column buffer is filled with the value for directions.TOP.
// The top-left corner cell is filled with the value for directions.NONE.
const initNWTracebacMatrix = ({ width, heigth }) => {
    const matrix = [];
    for (let row = 0; row < heigth; row += 1) {
        if (row === 0) {
            matrix[row] = Array(width).fill(directions.LEFT);
        } else {
            matrix[row] = Array(width).fill(directions.NONE);
            matrix[row][0] = directions.TOP;
        }
        matrix[0][0] = directions.NONE;
    }
    return matrix;
};

// Creates a matrix filled with the supplied value of the specified width and
// length.
const createMatrix = ({ width, heigth, fill = 0 }) =>
    Array(heigth)
        .fill(fill)
        .map(() => Array(width).fill(fill));

// Returns the left portion of the row specified by the supplied coordinates.
const extractRow = ({ matrix, row, col }) => matrix[row].slice(0, col + 1);

// Return the top portion of the column specified by the supplied coordinates.
const extractColumn = ({ matrix, row, col }) =>
    matrix
        .slice(0, row + 1)
        .map((_row) => _row.slice(col, col + 1))
        .reduce((prev, curr) => [...prev, ...curr], []);

module.exports = {
    createMatrix,
    extractColumn,
    extractRow,
    initNWScoringMatrix,
    initNWTracebacMatrix,
};
