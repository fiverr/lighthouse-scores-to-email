const fixture = require('../../fixtures/result.json');

let lightHouseApi;

describe('lightHouseApi', () => {
    beforeAll(() => {
        jest.mock('node-fetch', () => jest.fn());
        require('node-fetch').mockImplementation(
            () => new Promise(
                (resolve) => resolve({
                    json: () => new Promise((resolve) => resolve(fixture))
                })
            )
        );
        lightHouseApi = require('.');
    });
    afterAll(() => {
        jest.unmock('node-fetch');
    });

    it('should get results from pagespeed and filter them for us', async() => {
        const {
            requestedUrl,
            fetchTime,
            strategy,
            pageName,
            details
        } = await lightHouseApi(
            'SOME_KEY',
            {
                pageName: 'A Brilliant Page',
                pageUrl: 'https://website.com',
                strategy: 'mobile',
                categories: ['seo']
            }
        );

        expect(requestedUrl).toBe(fixture.id);
        expect(strategy).toBe('mobile');
        expect(pageName).toBe('A Brilliant Page');
        expect(fetchTime).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)); // zulu time
        expect(details).toEqual([ { name: 'seo', score: 92 } ]);
    });
});