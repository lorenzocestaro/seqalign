const { directions } = require('./dtypes');

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
