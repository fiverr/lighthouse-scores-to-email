const SDC = require('@fiverr/statsd-client');

const DEFAULT_PREFIX = 'lighthouse_scores_to_email';

function send({ statsdClient, dataFromApi }) {
    const statsd = new SDC({ host: statsdClient.host, port: statsdClient.port });
    const data = prepareDataFromApi(dataFromApi);
    data.forEach((permutation) => {
        statsd.gauge(buildStatsdMetric(
            statsdClient.prefix,
            permutation.page,
            permutation.strategy,
            permutation.category
        ), permutation.score);
    });
}

function prepareDataFromApi(dataFromApi) {
    const data = [];
    dataFromApi.forEach((arr) => {
        arr.forEach((url) => {
            const pageName = url.pageName.split(' ').join('').toLowerCase();
            const strategy = url.strategy;
            url.details.forEach((category) => {
                const metric =  { page: pageName, strategy, category: category.name, score: category.score };
                data.push(metric);
            });
        });
    });
    return data;
}

function buildStatsdMetric(prefix, pageName, strategy, category) {
    return [prefix || DEFAULT_PREFIX, pageName, strategy, category].join('.');
}

module.exports = {
    send,
    prepareDataFromApi,
    buildStatsdMetric
};
