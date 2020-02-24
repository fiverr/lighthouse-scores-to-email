const linkToPageSpeed = require('.');

describe('lib/linkToPageSpeed', () => {
    it('should link to this page\'s PageSpeed result page', () => {
        expect(linkToPageSpeed('https://httpbin.org/get?query=performance')).toBe('https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhttpbin.org%2Fget%3Fquery%3Dperformance');
    });
});
