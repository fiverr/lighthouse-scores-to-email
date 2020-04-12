const fixtures = [
    [
        { pageName: 'Search Page', requestedUrl: 'https://www.google.com/', strategy: 'mobile' },
        { pageName: 'Start Page', requestedUrl: 'https://www.start.co.il/', strategy: 'mobile' }
    ],
    [
        { pageName: 'Search Page', requestedUrl: 'https://www.google.com/', strategy: 'desktop' },
        { pageName: 'Start Page', requestedUrl: 'https://www.start.co.il/', strategy: 'desktop' }
    ]
];

const fetchTime = '2020-02-23T12:08:24.647Z';

module.exports = fixtures.map(
    (set) => set.map(
        ({ requestedUrl, pageName, strategy }) => ({
            requestedUrl,
            fetchTime,
            strategy,
            pageName,
            details: [{
                name: 'performance',
                score: 95
            }, {
                name: 'seo',
                score: 92
            }, {
                name: 'accessibility',
                score: 88
            }, {
                name: 'best-practices',
                score: 85
            }]
        })
    )
);
