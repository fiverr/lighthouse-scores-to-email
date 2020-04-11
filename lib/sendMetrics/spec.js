const dataFromApi = require('../../fixtures/dataFromApi');
const sendMetrics = require('.');

const firstPermuation = { 'category': 'performance', 'page': 'searchpage', 'score': 95, 'strategy': 'mobile' };
const secondPermutation = { 'category': 'accessibility', 'page': 'startpage', 'score': 88, 'strategy': 'desktop' };

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
            firstPermuation.page,
            firstPermuation.strategy,
            firstPermuation.category
        )).toBe('lighthouse_scores_to_email.searchpage.mobile.performance');
    });
});
