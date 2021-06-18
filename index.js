const pMap = require('p-map');
const getCombinations = require('./lib/getCombinations');
const lightHouseApi = require('./lib/lightHouseApi');
const defaultLogger = require('./lib/logger');
const sendEmail = require('./lib/sendEmail');
const sendMetrics = require('./lib/sendMetrics');

/**
 * @see readme for parameters
 * @returns {object}
 */
module.exports = async function run({
    categories = ['performance', 'seo', 'accessibility', 'best-practices'],
    strategies = ['mobile', 'desktop'],
    email = {},
    lightHouseApiKey,
    pages = {},
    statsdClient = {},
    logger = defaultLogger
}) {
    const strategiesCombinations = getCombinations({ strategies, categories, pages });
    if (strategiesCombinations.flat().length === 0) {
        logger.warn('No pages specified. Exit program.');
        return;
    }

    logger.debug('Retrieve results from PageSpeed API.');
    try {
        const dataFromApi = await pMap(
            strategiesCombinations,
            async(strategyCombinations) => await pMap(
                strategyCombinations,
                lightHouseApi.bind(null, lightHouseApiKey),
                { concurrency: 2 }
            )
        );

        if (email.to) {
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
        }

        if (statsdClient.host) {
            logger.debug('Send metrics to statsd.');
            try {
                const { length } = await sendMetrics.send({ statsdClient, dataFromApi });
                logger.info({
                    message: `${length} metrics were sent successfully.`
                });
            } catch (error) {
                logger.error(error);
            }
        }

        return dataFromApi;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
