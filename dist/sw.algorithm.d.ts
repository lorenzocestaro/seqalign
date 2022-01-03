export = smithWaterman;
declare function smithWaterman({ sequence1, sequence2, gapScoreFunction, similarityScoreFunction }: {
    sequence1: any;
    sequence2: any;
    gapScoreFunction: any;
    similarityScoreFunction: any;
}): {
    alignmentScore: number;
    scoringMatrix: any[][];
    tracebackMatrix: any[][];
    tracebackStart: number[];
};
//# sourceMappingURL=sw.algorithm.d.ts.map