const { TracedScore, directions } = require('./dtypes');

describe('Directions enum', () => {
    it('should be a freezed object', () => {
        const keys = Object.keys(directions).sort();
        directions.newProperty = true;
        directions[keys[-1]] = 'new value';
        delete directions[keys[0]];
        expect(Object.keys(directions).sort()).toEqual(keys);
    });
    it('should have specific keys (NONE, DIAGONAL, LEFT, TOP)', () => {
        const expectedKeys = ['NONE', 'DIAGONAL', 'LEFT', 'TOP'].sort();
        expect(Object.keys(directions).sort()).toEqual(expectedKeys);
    });
});

describe('TracedScore', () => {
    it('should create an object with score and direction properties', () => {
        const score = TracedScore(1, directions.TOP);
        expect(score).toHaveProperty('score');
        expect(score).toHaveProperty('direction');
    });
    it('should default to directions.NONE if direction is not specified', () => {
        const score = TracedScore(1);
        expect(score).toHaveProperty('score');
        expect(score).toHaveProperty('direction');
        expect(score.direction).toBe(directions.NONE);
    });
    it('should raise TypeError for invalid direction values', () => {
        expect(() => TracedScore(1, 'invalid direction')).toThrowError(TypeError);
    });
});
