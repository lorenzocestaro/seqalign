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
    align(sequence1?: string, sequence2?: string): {
        score: any;
        originalSequences: string[];
        alignedSequences: (string | any[])[];
        coordinateWalk: any[][];
        scoringMatrix: any;
        tracebackMatrix: any;
        alignment: string;
    };
};
//# sourceMappingURL=aligner.factory.d.ts.map