/**
 * @type {string} PageSpeed submitted URL page
 */
const BASE = 'https://developers.google.com/speed/pagespeed/insights/?url=';

/**
 * @param {string} url URL of page
 * @return {string} URL of PageSpeed for this page
 */
module.exports = (url) => BASE + encodeURIComponent(url);
