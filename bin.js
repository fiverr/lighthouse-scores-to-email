#!/usr/bin/env node
const { join } = require('path');
const logger = require('./lib/logger');
const config = require('./lib/config');
const run = require('.');

start();

process.on('unhandledRejection', ({ message, stack, code }) => console.log({
    level: 'error',
    message,
    stack,
    code
}));

async function start() {
    try {
        let userConfig;
        try {
            userConfig = require(join(__dirname, 'configuration/config.json'));
        } catch (error) {
            // ignore, this is acceptable
        }

        const {
            categories,
            email,
            lightHouseApiKey,
            strategies,
            statsdClient
        } = config(userConfig);

        const pages = require(join(__dirname, 'configuration/pages.json'));

        await run({
            categories,
            email,
            lightHouseApiKey,
            pages,
            strategies,
            statsdClient
        });

    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}
