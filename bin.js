#!/usr/bin/env node
const { join } = require('path');
const wait = require('@lets/wait');
const logger = require('./lib/logger');
const config = require('./lib/config');
const run = require('.');

start();

process.on(
    'unhandledRejection',
    ({ message, stack, code, response }) => console.log(
        JSON.stringify({
            level: 'error',
            message,
            stack,
            code,
            response
        })
    )
);

process.on(
    'exit',
    (code) => logger.info(
        `About to exit with code ${code}`
    )
);

async function start() {
    try {
        const userConfig = loadUserConfig();

        const {
            categories,
            email = {},
            lightHouseApiKey,
            strategies,
            statsdClient = {}
        } = config(userConfig);

        if (!email.to && !statsdClient.host) {
            logger.warn('No output method was configured (email, statsd). Exit program.');
            return;
        }

        const pages = require(join(__dirname, 'configuration/pages.json'));

        await run({
            categories,
            email,
            lightHouseApiKey,
            pages,
            strategies,
            statsdClient
        });

        await wait(2000);

    } catch (error) {
        logger.error(error);
        process.exit(1);
    } finally {
        process.exit();
    }
}

/**
 * Load configuration file if it exists
 */
function loadUserConfig() {
    try {
        return require(
            join(
                __dirname,
                'configuration/config.json'
            )
        );
    } catch (error) {
        return undefined;
    }
}
