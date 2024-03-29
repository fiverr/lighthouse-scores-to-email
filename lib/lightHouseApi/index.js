const fetch = require('node-fetch');
const setUpQuery = require('../setUpQuery');

/**
 * @param {string} pageUrl      The URL to fetch and analyze
 * @param {string} strategy     The analysis strategy (desktop or mobile) to use, and desktop is the default
 * @param {string[]} categories A Lighthouse category to run; if none are given, only Performance category will be run (accessibility, best-practices, performance, pwa, seo)
 * @param {string} pageName     Display name for the page
 * @return {object}
 */
module.exports = async function lightHouseApi(key, { pageUrl, pageName, strategy, categories }, { logger } = {}) {
    const url = setUpQuery(pageUrl, { strategy, categories, key });

    const response = await fetch(url);
    if (!response.ok) {
        const error = new Error(`Failed request to ${url}.`);
        error.response = response.statusText;
        error.status = response.status;
        throw error;
    }
    let json;
    try {
        json = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response. Request: ${url}. Status: ${response.status}. Respose: ${response.body}.`);
    }

    if (Object.hasOwnProperty.call(json, 'error')) {
        const error = new Error(`[${json.error.code}] URL: "${pageUrl}" (${pageName}, ${strategy}, ${categories.join('+')}). ${json.error.message}`);
        error.request = url;
        error.response = JSON.stringify(json);
        throw error;
    }

    const { lighthouseResult: {
        requestedUrl,
        fetchTime,
        categories: resultCategories
    } } = json;

    const details = categories.map((category) => ({
        name: category,
        score: Math.round(resultCategories[kebabCase(category)].score * 100)
    }));

    logger.debug(
        {
            message: `Results from lighthouse API for page ${pageUrl}, strategy: ${strategy}, categories: ${categories.join(',')}.`,
            description: JSON.stringify({ scores: details })
        }
    );

    return {
        requestedUrl,
        fetchTime,
        strategy,
        pageName,
        details
    };
};

const kebabCase = (category) => category.replace(/_/g, '-').toLowerCase();
