const NWaligner = require('./nw.api');

describe('NWaligner factory', () => {
    it(`should return an object with the following properties:
        similarityScoreFunction,
        gapScoreFunction,
        gapSymbol,
        directions,
        align`, () => {
        const aligner = NWaligner();
        expect(aligner).toHaveProperty('similarityScoreFunction');
        expect(aligner).toHaveProperty('inDelScore');
        expect(aligner).toHaveProperty('gapSymbol');
        expect(aligner).toHaveProperty('directions');
        expect(aligner).toHaveProperty('align');
    });
    it('should not throw exceptions when calling align() with valid inputs', () => {
        const aligner = NWaligner();
        const spy = jest.spyOn(aligner, 'align');
        const alignment = aligner.align('insertion', 'deletion');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toThrow();
        expect(alignment).toBeDefined();
    });
});
