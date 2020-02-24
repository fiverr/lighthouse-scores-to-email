const capitalize = require('.');

describe('lib/capitalize', () => {
    it('should capitalise first word', () => {
        expect(capitalize('hello, world')).toBe('Hello, world');
    });
});
