const { join } = require('path');
const pMap = require('p-map');
const getCombinations = require('./lib/getCombinations');
const lightHouseApi = require('./lib/lightHouseApi');
const logger = require('./lib/logger');
const sendEmail = require('./lib/sendEmail');
const {
    categories,
    email,
    lightHouseApiKey,
    strategies
} = require('./configuration/config.js');

runNow();

async function runNow() {
    let pages;
    try {
        pages = require(join(process.cwd(), 'configuration/pages.json'));
    } catch (error) {
        error.message = `Error trying to read pages file: ${error.message}`;
        console.error(error);
        process.exit(1);
    }

    const strategiesCombinations = getCombinations({ strategies, categories, pages });
    logger.info('Retrieve results from PageSpeed API.');
    const dataFromApi = await pMap(
        strategiesCombinations,
        async(strategyCombinations) => await pMap(
            strategyCombinations,
            lightHouseApi.bind(null, lightHouseApiKey),
            { concurrency: 2 }
        )
    );
    logger.info('Send email to recipients.');
    await sendEmail({ email, dataFromApi });
    logger.info('Finished.');
}
