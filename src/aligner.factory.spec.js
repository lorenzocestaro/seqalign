const { directions } = require('./dtypes');

const AlignerFactory = require('./aligner.factory');

describe('Aligner factory', () => {
    it('should return a factory function callable without arguments', () => {
        const newAlignerFactory = AlignerFactory({
            algorithm: jest.fn(),
            similarityScoreFunctionDefault: jest.fn(),
            gapScoreFunctionDefault: jest.fn(),
            directionsDefault: directions,
            gapSymbolDefault: '-',
        });
        expect(newAlignerFactory).not.toThrow();
    });
});
