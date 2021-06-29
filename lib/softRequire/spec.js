const { join } = require('path');
const softRequire = require('.');

describe('lib/softRequire', () => {
    it('loads JSON content', () => {
        const result = softRequire(join(__dirname, '..', '..', 'package.json'));
        expect(typeof result).toBe('object');
        expect(result.name).toBe('lighthouse-scores');
    });
    it('returns undefined for non existing file', () => {
        const result = softRequire(join(__dirname, '..', '..', 'nothing.json'));
        expect(result).toBeUndefined();
    });
});
