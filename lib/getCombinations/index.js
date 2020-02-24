/**
 * getCombinations : create request combinations for PageSpeed API
 * @param {string[]} options.strategies List of desired strategies (mobile, desktop)
 * @param {string[]} options.categories List of desired categories (seo, performance)
 * @param {object}   options.pages      Key-value pairs of pages where the key is the nickname and the value is the URL
 * @return {array[]} Combination sets for each strategy
 */
module.exports = ({ strategies, categories, pages }) => strategies.map(
    (strategy) => Object.entries(pages).map(
        ([pageName, pageUrl]) => ({
            pageName,
            pageUrl,
            strategy,
            categories
        })
    )
);
