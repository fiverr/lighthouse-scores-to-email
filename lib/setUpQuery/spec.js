const setUpQuery = require('.');

describe('setUpQuery', () => {
    it('should assemble URL with parameters in query string', () => {
        expect(
            setUpQuery(
                'https://www.website.com/page?key=balue',
                {
                    categories: ['performance', 'seo'],
                    strategy: 'mobile',
                    key: 'Aa123'
                }
            )
        ).toBe('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.website.com%2Fpage%3Fkey%3Dbalue&strategy=mobile&key=Aa123&category=performance&category=seo');
    });
});