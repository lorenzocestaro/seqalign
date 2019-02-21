const { createMatrix, extractColumn, extractRow } = require('./matrix.utils');

// prettier-ignore
const matrixFixture = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [1, 2, 3, 4],
    [5, 6, 7, 8]
];

describe('Matrix creation', () => {
    it.each([
        [
            { width: 10, heigth: 3 },
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
        ],
        [
            { width: 3, heigth: 10 },
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        ],
        [{ width: 3, heigth: 3 }, [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
        [{ width: 2, heigth: 2 }, [[0, 0], [0, 0]]],
        [{ width: 1, heigth: 1 }, [[0]]],
        [{ width: 0, heigth: 0 }, []],
    ])('should return a matrix with the specified dimensions', (input, output) =>
        expect(createMatrix(input)).toEqual(output),
    );
});

describe('Matrix column extraction', () => {
    it('should extract two elements from the third column', () => {
        const extractedColumn = extractColumn({
            matrix: matrixFixture,
            row: 1,
            col: 2,
        });
        expect(extractedColumn).toEqual([3, 7]);
    });
    it('should extract the whole first column', () => {
        const extractedColumn = extractColumn({
            matrix: matrixFixture,
            row: 3,
            col: 0,
        });
        expect(extractedColumn).toEqual([1, 5, 1, 5]);
    });
});

describe('Matrix row extraction', () => {
    it('should extract the first two elements from the third row', () => {
        const extractedColumn = extractRow({
            matrix: matrixFixture,
            row: 2,
            col: 1,
        });
        expect(extractedColumn).toEqual([1, 2]);
    });
    it('should extract the whole first row', () => {
        const extractedColumn = extractRow({
            matrix: matrixFixture,
            row: 0,
            col: 3,
        });
        expect(extractedColumn).toEqual([1, 2, 3, 4]);
    });
});
