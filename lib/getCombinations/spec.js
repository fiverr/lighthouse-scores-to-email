const getCombinations = require('.');

describe('getCombinations', () => {
    it('Gets a combination set for each strategy', () => {
        const options = {
            strategies: [ 'mobile', 'desktop' ],
            categories: [ 'one', 'two', 'three' ],
            pages: {
                name_1: 'https://1.com',
                name_2: 'https://2.com'
            }
        };

        expect(getCombinations(options)).toEqual([
            [
                { pageUrl: 'https://1.com', pageName: 'name_1', strategy: 'mobile', categories: [ 'one', 'two', 'three' ] },
                { pageUrl: 'https://2.com', pageName: 'name_2', strategy: 'mobile', categories: [ 'one', 'two', 'three' ] }
            ],
            [
                { pageUrl: 'https://1.com', pageName: 'name_1', strategy: 'desktop', categories: [ 'one', 'two', 'three' ] },
                { pageUrl: 'https://2.com', pageName: 'name_2', strategy: 'desktop', categories: [ 'one', 'two', 'three' ] }
            ]
        ]);
    });
});
