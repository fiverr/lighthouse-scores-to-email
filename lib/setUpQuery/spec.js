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
        ).toMatchSnapshot();
    });
});
