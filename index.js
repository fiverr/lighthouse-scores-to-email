const { join } = require('path');
const mailer = require('./lib/mailer');
const lightHouseApi = require('./lib/lightHouseApi');
const getCombinations = require('./lib/getCombinations');
const {
    categories,
    strategy: strategies
} = require('./configuration/config.js');

const pages = require(join(process.cwd(), 'configuration/pages.json'));

const PagesCombinations = getCombinations({ strategies, pages }, 0, [], {});

const callApi = async(categories, pagesCombinations) => {

    const dataFromApi = [];

    for (let i = 0; i < strategies.length; i++)
    {
        dataFromApi.push(new Array());
    }


    for (let index = 0; index < pagesCombinations.length; index++) {
        const pageUrl = Object.values(pagesCombinations[index].pages)[0];
        const strategy = pagesCombinations[index].strategies;
        const pageName = Object.keys(pagesCombinations[index].pages)[0];
        const resultFromApi = await lightHouseApi(pageUrl, strategy, categories, pageName);

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


