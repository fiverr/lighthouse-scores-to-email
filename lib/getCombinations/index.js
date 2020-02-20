module.exports = function getCombinations(options, optionIndex, results, current) {
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
};