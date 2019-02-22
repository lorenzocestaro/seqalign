const SWaligner = require('./sw.api');

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
    it('should not throw exceptions when calling align() with valid inputs', () => {
        const aligner = SWaligner();
        const spy = jest.spyOn(aligner, 'align');
        const alignment = aligner.align('insertion', 'deletion');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toThrow();
        expect(alignment).toBeDefined();
    });
});
