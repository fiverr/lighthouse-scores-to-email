const pMap = require('p-map');
const getCombinations = require('./lib/getCombinations');
const lightHouseApi = require('./lib/lightHouseApi');
const logger = require('./lib/logger');
const sendEmail = require('./lib/sendEmail');

module.exports = async function run({
    categories,
    email,
    lightHouseApiKey,
    strategies,
    pages
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
};
