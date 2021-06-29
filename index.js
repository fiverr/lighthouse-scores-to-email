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
    categories = ['PERFORMANCE', 'SEO', 'ACCESSIBILITY', 'BEST_PRACTICES'],
    strategies = ['MOBILE', 'DESKTOP'],
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
        const errors = [];

        const results = await pMap(
            strategiesCombinations,
            async(strategyCombinations) => await pMap(
                strategyCombinations,
                async (combination) => {
                    try {
                        return await lightHouseApi(lightHouseApiKey, combination);
                    } catch (error) {
                        return undefined;
                    }
                },
                { concurrency: 2 }
            )
        );

        const dataFromApi = results.map((page) => page.filter(Boolean));

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

        errors.length && logger.error({
            message: `Failed with ${errors.length} errors`,
            description: JSON.stringify(
                errors.map(
                    (error) => ({
                        message: error.message,
                        stack: error.stack,
                        name: error.constructor?.name,
                        ...error
                    })
                )
            )
        });

        return dataFromApi;
    } catch (error) {
        logger.error(error);
        return null;
    }
};
