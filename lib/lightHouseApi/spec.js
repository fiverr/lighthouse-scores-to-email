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

    it('wip', async() => {
        const {
            requestedUrl,
            fetchTime,
            strategy,
            pageName,
            details
        } = await lightHouseApi('https://website.com', 'mobile', ['seo'], 'A Brilliant Page');

        expect(requestedUrl).toBe(fixture.id);
        expect(strategy).toBe('mobile');
        expect(pageName).toBe('A Brilliant Page');
        expect(fetchTime).toEqual(expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)); // zulu time
        expect(details).toEqual([ { name: 'seo', score: 92 } ]);
    });
});