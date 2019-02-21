// Creates a matrix filled with zeros of the specified width and length.
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
        .map(_row => _row.slice(col, col + 1))
        .reduce((prev, curr) => [...prev, ...curr], []);

module.exports = {
    createMatrix,
    extractColumn,
    extractRow,
};
