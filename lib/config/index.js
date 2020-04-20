const {
    EMAIL_TO,
    EMAIL_FROM = 'Lighthouse Gazette <reporter@lighthouse-gazette.com>',
    EMAIL_SUBJECT = 'Google Lighthouse Report ✔',
    EMAIL_HOST = 'smtp.gmail.com',
    EMAIL_PORT = 465,
    SECURE = true,
    AUTH_USER,
    AUTH_PASSWORD,
    APIKEY,
    STATSD_HOST,
    STATSD_PORT = 8125,
    STATSD_PREFIX
} = process.env;

/**
 * @type {string[]}
 */
const DEFAULT_CATEGORIES = ['performance', 'seo', 'accessibility', 'best-practices'];

/**
 * @type {string[]}
 */
const DEFAULT_STRATEGIES = ['mobile', 'desktop'];

module.exports = function config(userConfiguration = {}) {
    const missing = [];
    const email = Object.assign(
        {
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: EMAIL_SUBJECT,
            host: EMAIL_HOST,
            port: parseInt(EMAIL_PORT, 10) || undefined,
            secure: SECURE,
            authUser: AUTH_USER,
            authPassword: AUTH_PASSWORD
        },
        userConfiguration.email || {}
    );

    const categories = userConfiguration.categories || DEFAULT_CATEGORIES;
    const strategies = userConfiguration.strategies || DEFAULT_STRATEGIES;
    const lightHouseApiKey = userConfiguration.lightHouseApiKey || APIKEY;

    const statsdClient = Object.assign(
        {
            host: STATSD_HOST,
            port: parseInt(STATSD_PORT, 10),
            prefix: STATSD_PREFIX
        },
        userConfiguration.statsd || {}
    );

    lightHouseApiKey || missing.push('PageSpeed API key');

    // Email requires all three configurations
    if (email.authUser || email.authPassword || email.to) {
        email.authUser || missing.push('Email username');
        email.authPassword || missing.push('Email password');
        email.to || missing.push('Email destination');
    }

    if (missing.length) {
        throw new Error(`Missing some required details: ${missing.join(', ')}. Please consult the documentation`);
    }

    return {
        categories,
        strategies,
        email,
        lightHouseApiKey,
        statsdClient
    };
};
