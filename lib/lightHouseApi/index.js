const fetch = require('node-fetch');
const setUpQuery = require('../setUpQuery');

/**
 * @param {string} pageUrl      The URL to fetch and analyze
 * @param {string} strategy     The analysis strategy (desktop or mobile) to use, and desktop is the default
 * @param {string[]} categories A Lighthouse category to run; if none are given, only Performance category will be run (accessibility, best-practices, performance, pwa, seo)
 * @param {string} pageName     Display name for the page
 * @return {object}
 */
module.exports = async function lightHouseApi(key, { pageUrl, pageName, strategy, categories }) {
    const url = setUpQuery(pageUrl, { strategy, categories, key });
    const response = await fetch(url);
    const json = await response.json();

    if (Object.hasOwnProperty.call(json, 'error')) {
        throw new Error(`[${json.error.code}] ${json.error.message}`);
    }

    const { lighthouseResult: {
        requestedUrl,
        fetchTime,
        categories: resultCategories
    } } = json;

    return {
        requestedUrl,
        fetchTime,
        strategy,
        pageName,
        details: categories.map((category) => ({
            name: category,
            score: Math.round(resultCategories[category].score * 100)
        }))
    };
};
