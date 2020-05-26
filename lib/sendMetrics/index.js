const SDC = require('@fiverr/statsd-client');

const DEFAULT_PREFIX = 'lighthouse_scores_to_email';

/**
 * @param {object} options.statsdClient StatsD client config
 * @param {object} options.dataFromApi
 * @returns {number} Number of metrics sent
 */
async function send({ statsdClient, dataFromApi }) {
    const statsd = new SDC({ host: statsdClient.host, port: statsdClient.port });
    const data = prepareDataFromApi(dataFromApi);
    const metrics = data.map(
        (permutation) => [
            buildStatsdMetric(
                statsdClient.prefix,
                permutation.page,
                permutation.strategy,
                permutation.category
            ),
            permutation.score
        ]
    );
    metrics.forEach(
        (metric) => statsd.gauge(...metric)
    );

    return metrics;
}

const prepareDataFromApi = (dataFromApi) => dataFromApi.map(
    (arr) => arr.map(
        ({ pageName, strategy, details }) => details.map(
            ({ name: category, score }) => ({
                page: pageName.replace(/\s+/g, '_').toLowerCase(),
                strategy,
                category,
                score
            })
        )
    ).flat()
).flat();

function buildStatsdMetric(prefix, pageName, strategy, category) {
    return [prefix || DEFAULT_PREFIX, pageName, strategy, category].join('.');
}

module.exports = {
    send,
    prepareDataFromApi,
    buildStatsdMetric
};
