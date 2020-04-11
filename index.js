const pMap = require('p-map');
const getCombinations = require('./lib/getCombinations');
const lightHouseApi = require('./lib/lightHouseApi');
const logger = require('./lib/logger');
const sendEmail = require('./lib/sendEmail');
const sendMetrics = require('./lib/sendMetrics');

module.exports = async function run({
    categories,
    email,
    lightHouseApiKey,
    strategies,
    pages,
    statsdClient
}) {
    const strategiesCombinations = getCombinations({ strategies, categories, pages });
    logger.debug('Retrieve results from PageSpeed API.');
    const dataFromApi = await pMap(
        strategiesCombinations,
        async(strategyCombinations) => await pMap(
            strategyCombinations,
            lightHouseApi.bind(null, lightHouseApiKey),
            { concurrency: 2 }
        )
    );
    logger.debug('Send email to recipients.');
    try {
        const result = await sendEmail({ email, dataFromApi });

        logger.info({
            message: 'Email sent successfully',
            response: JSON.stringify(result)
        });
    } catch (error) {
        logger.error(error);
    }

    logger.debug('Sending metrics to statsd.');
    try {
        const result = await sendMetrics.send({ statsdClient, dataFromApi });
        logger.info({
            message: 'Metrics were sent successfully',
            response: JSON.stringify(result)
        });
    } catch (error) {
        logger.error(error);
    }
};
