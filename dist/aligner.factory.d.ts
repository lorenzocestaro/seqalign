export = AlignerFactory;
declare function AlignerFactory({ algorithm, similarityScoreFunctionDefault, gapScoreFunctionDefault, gapSymbolDefault }: {
    algorithm: any;
    similarityScoreFunctionDefault: any;
    gapScoreFunctionDefault: any;
    gapSymbolDefault: any;
}): ({ similarityScoreFunction, gapScoreFunction, gapSymbol, }?: {
    similarityScoreFunction?: any;
    gapScoreFunction?: any;
    gapSymbol?: any;
}) => {
    similarityScoreFunction: any;
    gapScoreFunction: any;
    gapSymbol: any;
    directions: Readonly<{
        NONE: number;
        DIAGONAL: number;
        LEFT: number;
        TOP: number;
    }>;
    /**
     *
     * @param {string | string[]} sequence1
     * @param {string | string[]} sequence2
     * @returns {{score, tracebackMatrix, scoringMatrix, alignedSequences: (string|[])[], originalSequences: string[], alignment: string, coordinateWalk: [[*,*]]}}
     */
    align(sequence1?: string | string[], sequence2?: string | string[]): {
        score: any;
        tracebackMatrix: any;
        scoringMatrix: any;
        alignedSequences: (string | [])[];
        originalSequences: string[];
        alignment: string;
        coordinateWalk: [[any, any]];
    };
};
//# sourceMappingURL=aligner.factory.d.ts.map