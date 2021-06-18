const dataFromApi = require('../../fixtures/dataFromApi');
const sendMetrics = require('.');

const firstPermuation = { 'category': 'performance', 'page': 'search_page', 'score': 95, 'strategy': 'mobile' };
const secondPermutation = { 'category': 'accessibility', 'page': 'start_page', 'score': 88, 'strategy': 'desktop' };

describe('prepareDataFromApi', () => {
    it('should return array with the correct number of permutation', () => {
        expect(sendMetrics.prepareDataFromApi(dataFromApi)).toHaveLength(16);
    });

    it('should return array with the correct data', () => {
        expect(sendMetrics.prepareDataFromApi(dataFromApi)).toContainEqual(firstPermuation);
        expect(sendMetrics.prepareDataFromApi(dataFromApi)).toContainEqual(secondPermutation);
    });
});

describe('buildStatsdMetric', () => {
    it('should return the correct string format', () => {
        expect(sendMetrics.buildStatsdMetric(
            null,
            firstPermuation.page,
            firstPermuation.strategy,
            firstPermuation.category
        )).toBe('lighthouse_scores_to_email.search_page.mobile.performance');
    });
    it('should use given prefix the correct string format', () => {
        expect(sendMetrics.buildStatsdMetric(
            'something_custom',
            firstPermuation.page,
            firstPermuation.strategy,
            firstPermuation.category
        )).toBe('something_custom.search_page.mobile.performance');
    });
});
