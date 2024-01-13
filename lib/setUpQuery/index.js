const { URL } = require('url');
const { encode } = require('querystring');

/**
 * @see https://developers.google.com/speed/docs/insights/v5/get-started
 */
const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

/**
 * Prepare the query URL for pagespeed API
 * @param {string}   url                The URL to fetch and analyze
 * @param {string}   options.strategy   The analysis strategy (desktop or mobile) to use, and desktop is the default
 * @param {string[]} options.categories A Lighthouse category to run; if none are given, only Performance category will be run (accessibility, best-practices, performance, pwa, seo)
 * @param {string}   options.key        API key
 * @return {string} Full URL for the test
 */
module.exports = function setUpQuery(url, { strategy, categories, key }) {
    const parameters = {
        url,
        strategy,
        key
    };

    const address = new URL(api);
    address.search = [
        encode(parameters),

        // We have to parse individual object because all entries share the same key
        ...categories.map((category) => encode({ category }))
    ].join('&');

    return address.toString();
};
