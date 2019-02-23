const { NWaligner, SWaligner } = require('./index');

describe('NWaligner factory', () => {
    it(`should return a valid object with the following properties:
        similarityScoreFunction,
        gapScoreFunction,
        gapSymbol,
        directions,
        align`, () => {
        const aligner = NWaligner();
        expect(aligner).toHaveProperty('similarityScoreFunction');
        expect(aligner).toHaveProperty('gapScoreFunction');
        expect(aligner).toHaveProperty('gapSymbol');
        expect(aligner).toHaveProperty('directions');
        expect(aligner).toHaveProperty('align');
    });
});

describe('NWaligner instance align() method', () => {
    it('should not throw exceptions when calling align() with valid inputs', () => {
        const aligner = NWaligner();
        const spy = jest.spyOn(aligner, 'align');
        const alignment = aligner.align('insertion', 'deletion');
        expect(spy).toHaveReturnedTimes(1);
        expect(alignment).toBeDefined();
    });
    it('should return a valid data structure', () => {
        const aligner = NWaligner();
        const seq1 = 'insertion';
        const seq2 = 'deletion';
        const alignment = aligner.align(seq1, seq2);

        expect(alignment).toHaveProperty('score');
        expect(alignment.score).toEqual(expect.any(Number));

        expect(alignment).toHaveProperty('originalSequences');
        expect(alignment.originalSequences).toEqual(
            expect.arrayContaining([expect.any(String), expect.any(String)]),
        );
        expect(alignment.originalSequences).toHaveLength(2);

        expect(alignment).toHaveProperty('alignedSequences');
        expect(alignment.alignedSequences).toEqual(
            expect.arrayContaining([expect.any(String), expect.any(String)]),
        );
        expect(alignment.alignedSequences).toHaveLength(2);

        expect(alignment).toHaveProperty('scoringMatrix');
        expect(alignment.scoringMatrix).toEqual(expect.any(Array));
        expect(alignment.scoringMatrix).toHaveLength(seq1.length + 1);
        alignment.scoringMatrix.forEach(row => {
            expect(row).toHaveLength(seq2.length + 1);
            row.forEach(cell => expect(cell).toEqual(expect.any(Number)));
        });

        expect(alignment).toHaveProperty('tracebackMatrix');
        expect(alignment.tracebackMatrix).toEqual(expect.any(Array));
        expect(alignment.tracebackMatrix).toHaveLength(seq1.length + 1);
        alignment.tracebackMatrix.forEach(row => {
            expect(row).toHaveLength(seq2.length + 1);
            row.forEach(cell => expect(cell).toEqual(expect.anything()));
        });

        expect(alignment).toHaveProperty('coordinateWalk');
        expect(alignment.coordinateWalk).toEqual(expect.any(Array));
        alignment.coordinateWalk.forEach(coordinate => {
            expect(coordinate).toEqual([expect.any(Number), expect.any(Number)]);
        });

        expect(alignment).toHaveProperty('alignment');
        expect(alignment.alignment).toEqual(expect.any(String));
        expect(alignment.alignment).toEqual(expect.stringContaining('\n'));
    });
});

describe('SWaligner factory', () => {
    it(`should return an object with the following properties:
        similarityScoreFunction,
        gapScoreFunction,
        gapSymbol,
        directions,
        align`, () => {
        const aligner = SWaligner();
        expect(aligner).toHaveProperty('similarityScoreFunction');
        expect(aligner).toHaveProperty('gapScoreFunction');
        expect(aligner).toHaveProperty('gapSymbol');
        expect(aligner).toHaveProperty('directions');
        expect(aligner).toHaveProperty('align');
    });
});

describe('SWaligner instance align() method', () => {
    it('should not throw exceptions when calling align() with valid inputs', () => {
        const aligner = SWaligner();
        const spy = jest.spyOn(aligner, 'align');
        const alignment = aligner.align('insertion', 'deletion');
        expect(spy).toHaveReturnedTimes(1);
        expect(alignment).toBeDefined();
    });
    it('should return a valid data structure', () => {
        const aligner = SWaligner();
        const seq1 = 'insertion';
        const seq2 = 'deletion';
        const alignment = aligner.align(seq1, seq2);

        expect(alignment).toHaveProperty('score');
        expect(alignment.score).toEqual(expect.any(Number));

        expect(alignment).toHaveProperty('originalSequences');
        expect(alignment.originalSequences).toEqual(
            expect.arrayContaining([expect.any(String), expect.any(String)]),
        );
        expect(alignment.originalSequences).toHaveLength(2);

        expect(alignment).toHaveProperty('alignedSequences');
        expect(alignment.alignedSequences).toEqual(
            expect.arrayContaining([expect.any(String), expect.any(String)]),
        );
        expect(alignment.alignedSequences).toHaveLength(2);

        expect(alignment).toHaveProperty('scoringMatrix');
        expect(alignment.scoringMatrix).toEqual(expect.any(Array));
        expect(alignment.scoringMatrix).toHaveLength(seq1.length + 1);
        alignment.scoringMatrix.forEach(row => {
            expect(row).toHaveLength(seq2.length + 1);
            row.forEach(cell => expect(cell).toEqual(expect.any(Number)));
        });

        expect(alignment).toHaveProperty('tracebackMatrix');
        expect(alignment.tracebackMatrix).toEqual(expect.any(Array));
        expect(alignment.tracebackMatrix).toHaveLength(seq1.length + 1);
        alignment.tracebackMatrix.forEach(row => {
            expect(row).toHaveLength(seq2.length + 1);
            row.forEach(cell => expect(cell).toEqual(expect.anything()));
        });

        expect(alignment).toHaveProperty('coordinateWalk');
        expect(alignment.coordinateWalk).toEqual(expect.any(Array));
        alignment.coordinateWalk.forEach(coordinate => {
            expect(coordinate).toEqual([expect.any(Number), expect.any(Number)]);
        });

        expect(alignment).toHaveProperty('alignment');
        expect(alignment.alignment).toEqual(expect.any(String));
        expect(alignment.alignment).toEqual(expect.stringContaining('\n'));
    });
});
