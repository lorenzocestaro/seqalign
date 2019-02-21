const apply = fn => iterable => iterable.map(fn);

const pipe = (...fns) => fns.reduce((prev, curr) => x => curr(prev(x)), x => x);

const reverse = x => -x;

const nanException = () => {
    throw TypeError('Non number input to decreaseAndRectify().');
};

const throwIfNotNumber = x => (Number.isNaN(Number(x)) ? nanException() : x);

module.exports = {
    apply,
    reverse: pipe(
        throwIfNotNumber,
        reverse,
    ),
};
