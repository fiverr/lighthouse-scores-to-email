var mailer = require('./lib/mailer');
var lightHouseApi = require('./lib/lightHouseApi');

var conf = {
    strategy: ['mobile', 'desktop'],
    pages: [
        {"Category Page" : 'https://www.fiverr.com/categories/graphics-design/creative-logo-design',},
        {"Gig Page": 'https://www.fiverr.com/aishar/record-a-female-voice-over-in-an-american-accent'}
    ]
};

// var conf = {
//     strategy: ['desktop'],
//     pages: [
//         {categoryPage: 'https://www.fiverr.com/categories/graphics-design/creative-logo-design',}
//     ]
// };

var categories = ['performance','seo','accessibility','pwa', 'best-practices']

function getCombinations(options, optionIndex, results, current) {
    var allKeys = Object.keys(options);
    var optionKey = allKeys[optionIndex];

    var vals = options[optionKey];

    for (var i = 0; i < vals.length; i++) {
        current[optionKey] = vals[i];

        if (optionIndex + 1 < allKeys.length) {
            getCombinations(options, optionIndex + 1, results, current);
        } else {
            var res = JSON.parse(JSON.stringify(current));
            results.push(res);
        }
    }

    return results;
}

var PagesCombinations = getCombinations(conf, 0, [], {});

const callApi = async (categories, pagesCombinations ) => {  

    const dataFromApi = []
    for (let index = 0; index < pagesCombinations.length; index++) {
        const pageUrl = Object.values(pagesCombinations[index].pages)[0]
        const strategy = pagesCombinations[index].strategy
        const pageName = Object.keys(pagesCombinations[index].pages)[0]
        const resultFromApi = await lightHouseApi.queryApi(pageUrl,strategy,categories,pageName)
        dataFromApi.push(resultFromApi)
    }     
    return dataFromApi
}




const runNow = async() => {
    const getApiDate = await callApi(categories,PagesCombinations)
    await mailer.sendEmail(getApiDate)
}


runNow()
