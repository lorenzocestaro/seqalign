const { directions } = require('./dtypes');
const { reverse } = require('./utils');

const nwAlgorithm = require('./nw.algorithm');
const nwTraceback = require('./nw.traceback');
const swAlgorithm = require('./sw.algorithm');
const swTraceback = require('./sw.traceback');
const AlignerFactory = require('./aligner.factory');

module.exports = {
    NWaligner: AlignerFactory({
        algorithm: nwAlgorithm,
        traceback: nwTraceback,
        similarityScoreFunctionDefault: (char1, char2) => (char1 === char2 ? 1 : -2),
        gapScoreFunctionDefault: () => -1,
        directionsDefault: directions,
        gapSymbolDefault: '-',
    }),
    SWaligner: AlignerFactory({
        algorithm: swAlgorithm,
        traceback: swTraceback,
        similarityScoreFunctionDefault: (char1, char2) => (char1 === char2 ? 2 : -1),
        gapScoreFunctionDefault: reverse,
        directionsDefault: directions,
        gapSymbolDefault: '-',
    }),
};
