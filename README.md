### sequence-align

[![Build Status](https://travis-ci.org/lorenzocestaro/seqalign.svg?branch=master)](https://travis-ci.org/lorenzocestaro/seqalign)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1e71505ebaff9557852d/test_coverage)](https://codeclimate.com/github/lorenzocestaro/seqalign/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e71505ebaff9557852d/maintainability)](https://codeclimate.com/github/lorenzocestaro/seqalign/maintainability)
[![npm version](https://badge.fury.io/js/seqalign.svg)](https://badge.fury.io/js/seqalign)

_Collection of sequence alignment algorithms._

## Table of contents
* [Getting started](#getting-started)
* [Aligners](#aligners)
* [Defaults](#defaults)
* [Usage](#usage)
* [Alignment result](#alignment-result)

## Getting started
Install the package from npm:
```bash
$ npm install --save seqalign
```
Import the package in your project:
```javascript
const { NWaligner, SWaligner } = require('seqalign');
```

#### Aligners
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
* `directions`: enum object used to define direction codes for the traceback
matrix.

#### Defaults
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
const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    TOP: 3,
});
```
Generally, you should not have the need to change the directions enum, but if
you need to carry out operations on the traceback matrix yourself, you can
define your custom characters, remember:
* It is not necessary to freeze the custom directions object but it is
recommended.
* Do not change enum keys (i.e. `NONE`, `DIAGONAL`, `LEFT`, `TOP`) or the
algorithms will not work.

#### Usage
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

## Alignment result
The `align` method of the aligner instances returns an object with the following
properties:
* `score <int>`: alignment score.
* `originalSequences Array<str>`: original input sequences.
* `alignedSequences Array<str>`: aligned sequences.
* `scoringMatrix Array<Array<int>>`: alignment scores matrix.
* `tracebackMatrix Array<Array<int>>`: alignment traceback directions matrix.
* `coordinateWalk Array<Array<int>>`: coordinate walk from the traceback matrix.
* `alignment <str>`: printable visual alignment string.
