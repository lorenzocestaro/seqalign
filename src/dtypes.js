const directions = Object.freeze({
    NONE: 0,
    DIAGONAL: 1,
    LEFT: 2,
    TOP: 3,
});
const directionValues = Object.values(directions);

// Data type for traced back, scoring matrix, cel scores.
// Stores a score value and a traceback direction.
const TracedScore = (score, direction = directions.NONE) => {
    if (directionValues.includes(direction)) {
        return { score, direction };
    }
    throw TypeError('Invalid direction value for TracedScore');
};

module.exports = {
    TracedScore,
    directions,
};
