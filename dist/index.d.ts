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
//# sourceMappingURL=index.d.ts.map