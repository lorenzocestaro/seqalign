const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    TOP: 3,
});

const TracedScore = (score, direction = directions.NONE) => {
    if (Object.values(directions).includes(direction)) {
        return { score, direction };
    }
    throw TypeError('Invalid direction value for TracedScore');
};

module.exports = {
    TracedScore,
    directions,
};
