# seqalign

_Collection of sequence alignment algorithms._

[![Travis (.org)](https://img.shields.io/travis/lorenzocestaro/seqalign.svg)](https://travis-ci.org/lorenzocestaro/seqalign)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/lorenzocestaro/seqalign.svg)](https://codeclimate.com/github/lorenzocestaro/seqalign)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/lorenzocestaro/seqalign.svg)](https://codeclimate.com/github/lorenzocestaro/seqalign)
[![npm](https://img.shields.io/npm/v/seqalign.svg)](https://www.npmjs.com/package/seqalign)

### Table of contents
* [Getting started](#getting-started)
* [Aligners](#aligners)
* [Defaults](#defaults)
* [Usage](#usage)
* [Alignment result](#alignment-result)

### Getting started
Install the package from npm:
```bash
$ npm install --save seqalign
```
Import the package in your project:
```javascript
const { NWaligner, SWaligner } = require('seqalign');
```

### Aligners
`SWaligner` and `NWaligner` are factory fucntions, you can create many aligners
with different parameters and re-use each one multiple times. An aligner is
configurable with the following parameters (all of them are optional):
* `similarityScoreFunction`: takes two characters (string) as input and returns
a similarity score (integer).
* `gapScoreFunction`:
  * Smith-Waterman: takes one positive integer as input (gap length) and
    returns a score (integer).
  * Needleman-Wunsch: takes no input and returns a constant score used for
    scoring insertions and deletions in the alignment.
* `gapSymbol`: a custom character (string) used to represent gaps in the
alignment.

All the listed parameters are accessible from each aligner instance in addition
with the following non configurable parameters:
* `directions`: enum object used to define direction codes for the traceback
matrix.

### Defaults
Here are the default values for the aligner options:
```javascript
// Smith-Waterman.
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1);
const gapScoreFunction = k => -k;

//Needleman-Wunsch.
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 1 : -2);
const gapScoreFunction = () => -1;

// Common defaults.
const gapSymbol = '-';
```

### Usage
Instantiating `SWaligner` or `NWaligner` returns an aligner object which exposes an `align`
method. `align` accepts the two strings to align as input:
```javascript
// Smith-Waterman.
const { SWaligner } = require('seqalign');

const defaultAligner = SWaligner();
const customAligner = SWaligner({
  gapScoreFunction: x => x / 2,
  gapSymbol: '~',
})

const defaultResult = defaultAligner.align('insertion', 'deletion');
const customResult = customAligner.align('insertion', 'deletion');

console.log(defaultResult.alignment)
// > ertion
// > e-tion

console.log(customResult.alignment)
// > inse~~rtion
// > ~~~ele~tion
```

```javascript
// Needleman-Wunsch.
const { NWaligner } = require('seqalign');

const defaultAligner = NWaligner();
const customAligner = NWaligner({
  inDelScore: -3,
  gapSymbol: '~',
})

const defaultResult = defaultAligner.align('insertion', 'deletion');
const customResult = customAligner.align('insertion', 'deletion');

console.log(defaultResult.alignment)
// > -inse--rtion
// > d---ele-tion

console.log(customResult.alignment)
// > insertion
// > dele~tion
```

### Alignment result
The `align` method of the aligner instances returns an object with the following
properties:
* `score <int>`: alignment score.
* `originalSequences Array<str>`: original input sequences.
* `alignedSequences Array<str>`: aligned sequences.
* `scoringMatrix Array<Array<int>>`: alignment scores matrix.
* `tracebackMatrix Array<Array<int>>`: alignment traceback directions matrix.
* `coordinateWalk Array<Array<int>>`: coordinate walk from the traceback matrix.
* `alignment <str>`: printable visual alignment string.
