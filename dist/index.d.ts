export const NWaligner: ({ similarityScoreFunction, gapScoreFunction, gapSymbol, }?: {
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
    align(sequence1?: string | string[], sequence2?: string | string[]): {
        score: any;
        tracebackMatrix: any;
        scoringMatrix: any;
        alignedSequences: (string | string[])[];
        originalSequences: string[];
        alignment: string;
        coordinateWalk: [[any, any]];
    };
};
export const SWaligner: ({ similarityScoreFunction, gapScoreFunction, gapSymbol, }?: {
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
    align(sequence1?: string | string[], sequence2?: string | string[]): {
        score: any;
        tracebackMatrix: any;
        scoringMatrix: any;
        alignedSequences: (string | string[])[];
        originalSequences: string[];
        alignment: string;
        coordinateWalk: [[any, any]];
    };
};
//# sourceMappingURL=index.d.ts.map