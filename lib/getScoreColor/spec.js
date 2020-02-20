const getScoreColor = require('.');

describe('lib/getScoreColor', () => {
    it('should return green for scores over 90', () => {
        expect(getScoreColor(100)).toBe('#2ecc71');
        expect(getScoreColor(90)).toBe('#2ecc71');
    });
    it('should return orange for scores between 50 and 89', () => {
        expect(getScoreColor(89)).toBe('#f39c12');
        expect(getScoreColor(50)).toBe('#f39c12');
    });
    it('should return red for everything else', () => {
        expect(getScoreColor(49)).toBe('#c0392b');
        expect(getScoreColor(1)).toBe('#c0392b');
        expect(getScoreColor('something else')).toBe('#c0392b');
    });
});
