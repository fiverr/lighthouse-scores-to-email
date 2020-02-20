const mailer = require('./lib/mailer');
const lightHouseApi = require('./lib/lightHouseApi');
const config = require('./configuration/config.js');
const fs = require("fs");



const categories = config.categories;

function getCombinations(options, optionIndex, results, current) {
    const allKeys = Object.keys(options);
    const optionKey = allKeys[optionIndex];
    const vals = options[optionKey];

    for (let i = 0; i < vals.length; i++) {
        current[optionKey] = vals[i];

        if (optionIndex + 1 < allKeys.length) {
            getCombinations(options, optionIndex + 1, results, current);
        } else {
            const res = JSON.parse(JSON.stringify(current));
            results.push(res);
        }
    }

    return results;
}

const strategies = config.strategy;
const pages = fs.readFileSync('./configuration/pages.json')
const pagesContent = JSON.parse(pages);

const conf = { strategies, pages: pagesContent };

const PagesCombinations = getCombinations(conf, 0, [], {});

const callApi = async(categories, pagesCombinations) => {

    const dataFromApi = [];

    for (let i=0; i < strategies.length; i++)
    {
        dataFromApi.push(new Array());
    }


    for (let index = 0; index < pagesCombinations.length; index++) {
        const pageUrl = Object.values(pagesCombinations[index].pages)[0];
        const strategy = pagesCombinations[index].strategies;
        const pageName = Object.keys(pagesCombinations[index].pages)[0];
        const resultFromApi = await lightHouseApi.queryApi(pageUrl, strategy, categories, pageName);

        const currectLocation = strategies.findIndex((element) => element === strategy);
        dataFromApi[currectLocation].push(resultFromApi);
    }

    return dataFromApi;
};

const runNow = async() => {
    const getApiData = await callApi(categories, PagesCombinations);
    await mailer.sendEmail(getApiData);
};



runNow();


