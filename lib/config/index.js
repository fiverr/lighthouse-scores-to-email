const {
    EMAIL_TO,
    EMAIL_FROM = 'Lighthouse Gazette <reporter@lighthouse-gazette.com>',
    EMAIL_SUBJECT = 'Google Lighthouse Report ✔',
    HOST = 'smtp.gmail.com',
    PORT = 465,
    SECURE = true,
    AUTH_USER,
    AUTH_PASSWORD,
    APIKEY
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
            host: HOST,
            port: parseInt(PORT, 10) || undefined,
            secure: SECURE,
            authUser: AUTH_USER,
            authPassword: AUTH_PASSWORD
        },
        userConfiguration.email || {}
    );

    const categories = userConfiguration.categories || DEFAULT_CATEGORIES;
    const strategies = userConfiguration.strategies || DEFAULT_STRATEGIES;
    const lightHouseApiKey = userConfiguration.lightHouseApiKey || APIKEY;

    lightHouseApiKey || missing.push('PageSpeed API key');
    email.authUser || missing.push('Email username');
    email.authPassword || missing.push('Email password');
    email.to || missing.push('Email destination');

    if (missing.length) {
        throw new Error(`Missing some required details: ${missing.join(', ')}. Please consult the documentation`);
    }

    return {
        categories,
        strategies,
        email,
        lightHouseApiKey
    };
};
