const fetch = require('node-fetch');
const config = require('../configuration/config.js');

async function queryApi(pageUrl, strategy, categories, pageName) {
    const details = [];
    const url = setUpQuery(pageUrl, strategy, categories);
    const response = await fetch(url);
    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    const lighthouseMetrics = {
        'requestedUrl' : lighthouse.requestedUrl,
        'fetchTime': lighthouse.fetchTime,
        strategy,
        pageName
    };
    categories.forEach((category) => {
        details.push({name: category, score: Math.round(lighthouse.categories[category].score * 100)});
    });
    lighthouseMetrics.details = details;

    return lighthouseMetrics;

}

function setUpQuery(url, strategy, categories) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const apiKey = config.lightHouseApiKey;
    const parameters = {
        url: encodeURIComponent(url),
        strategy,
        key: apiKey
    };
    const queryString = Object.keys(parameters).map((key) => `${key}=${parameters[key]}`).join('&');
    let query = `${api}?`;
    query += queryString;

    let categoriesList = '&category=';

    categories.forEach((i, index) => {
        categoriesList += i;
        if (index !== (categories.length - 1)) {
            categoriesList += '&category=';
        }
    });

    query += categoriesList;
    return query;
}

exports.queryApi = queryApi;