const fetch = require('node-fetch');

async function queryApi(pageUrl,strategy,categories,pageName) {
    details = []
    const url = setUpQuery(pageUrl,strategy,categories);
    let response = await fetch(url);
    let data = await response.json()
    const lighthouse = data.lighthouseResult;
    const lighthouseMetrics = {
        "requestedUrl" : lighthouse.requestedUrl,
        "fetchTime": lighthouse.fetchTime,
        "strategy": strategy,
        "pageName": pageName,
    }
    categories.forEach (category => {
        details.push({name: category, score: Math.round(lighthouse.categories[category]['score'] * 100)})
    })
    lighthouseMetrics["details"] = details

    return lighthouseMetrics;

  }
  
function setUpQuery(url,strategy,categories) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        url: encodeURIComponent(url),
        strategy: strategy,
    }; 
    var queryString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
    let query = `${api}?`;
    query += queryString

    categoriesList = '&category=' 

    categories.forEach(function(i, index) {
        categoriesList += i;
        if (index != (categories.length - 1)) {
          categoriesList += '&category=';
        };
      });
    
    query += categoriesList

    return query;
}

exports.queryApi = queryApi;