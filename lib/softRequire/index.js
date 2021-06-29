/**
 * Load JSON file if it exists
 * @param {string} path Path to file
 * @returns {any} value of JSON file or undefined
 */
module.exports = function softRequire(path) {
    try {
        return require(path);
    } catch (error) {
        return undefined;
    }
};
