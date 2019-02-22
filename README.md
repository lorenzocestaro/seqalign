### sequence-align

[![Build Status](https://travis-ci.org/lorenzocestaro/seqalign.svg?branch=master)](https://travis-ci.org/lorenzocestaro/seqalign)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1e71505ebaff9557852d/test_coverage)](https://codeclimate.com/github/lorenzocestaro/seqalign/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e71505ebaff9557852d/maintainability)](https://codeclimate.com/github/lorenzocestaro/seqalign/maintainability)
[![npm version](https://badge.fury.io/js/seqalign.svg)](https://badge.fury.io/js/seqalign)

_Collection of sequence alignment algorithms._

## Table of contents
- [Getting started](#getting-started)
- [Smith-Waterman](#smith-waterman)
  - [SWaligner](#swaligner)
  - [Defaults](#defaults)
  - [Usage](#usage)
  - [Alignment result](#alignment-result)
- [Needleman-Wunsch](#needleman-wunsch)
  - [NWaligner](#swaligner)
  - [Defaults](#defaults)
  - [Usage](#usage)
- [Alignment result](#alignment-result)

## Getting started
Install the package from npm:
```bash
$ npm install --save seqalign
```
Import the package in your project:
```javascript
const { NWaligner, SWaligner } = require('seqalign');
```

## Smith-Waterman
The [Smith-Waterman](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)
algorithm is primarily used for local alignment of string sequences from
biological datasources (DNA, RNA, protein). But can be successfully used to
align any kind of character sequence.

#### SWaligner
`SWaligner` is a factory, you can create many aligners with different
 parameters and re-use each one multiple times. An aligner is configurable
 with the following parameters (all of them are optional):
* `similarityScoreFunction`: takes two characters (string) as input and returns
a similarity score (integer).
* `gapScoreFunction`: takes one positive integer as input (gap length) and
returns a score (integer).
* `gapSymbol`: a custom character (string) used to represent gaps in the
alignment.
* `directions`: enum object used to define direction codes for the traceback
matrix.

> _Tip: Higher scores for gaps means higher chances of having one inserted.
> Generally you should choose a function that gives higher scores to shorter
> gaps._

#### Defaults
Here are the default values for the aligner options:
```javascript
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1);
const gapScoreFunction = k => -k;
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
algorithm will not work.

#### Usage
Instantiating `SWaligner` returns an aligner object which exposes an `align`
method. `align` accepts the two strings to align as input:
```javascript
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

## Needleman-Wunsch
The [Needleman-Wunsch](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm#Scoring_systems)
algorithm is primarily used for aligning of string sequences from
biological datasources (DNA, RNA, protein). But can be successfully used to
align any kind of character sequence. It differs slightly from Smith-Waterman
because it aligns the whole two input sequences and it is not limited to local
optimum alignment.

#### NWaligner
`NWaligner` is a factory, you can create many aligners with different
 parameters and re-use each one multiple times. An aligner is configurable
 with the following parameters (all of them are optional):
* `similarityScoreFunction`: takes two characters (string) as input and returns
a similarity score (integer).
* `inDelScore`: integer value that defines the score for an in/del.
* `gapSymbol`: a custom character (string) used to represent gaps in the
alignment.
* `directions`: enum object used to define direction codes for the traceback
matrix.

#### Defaults
Here are the default values for the aligner options:
```javascript
const similarityScoreFunction = (char1, char2) => (char1 === char2 ? 2 : -1);
const inDelScore = -1;
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
algorithm will not work.

#### Usage
Instantiating `NWaligner` returns an aligner object which exposes an `align`
method. `align` accepts the two strings to align as input:
```javascript
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
The `align` method of the aligner istances returns an object with the following
properties:
* `score <int>`: alignment score.
* `originalSequences Array<str>`: original input sequences.
* `alignedSequences Array<str>`: locally aligned sequences.
* `scoringMatrix Array<Array<int>>`: alignment scores matrix.
* `tracebackMatrix Array<Array<int>>`: alignment traceback directions matrix.
* `coordinateWalk Array<Array<int>>`: coordinate walk from the traceback matrix.
* `alignment <str>`: printable visual alignment string.
