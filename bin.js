#!/usr/bin/env node
const { join } = require('path');
const wait = require('@lets/wait');
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

process.on('exit', (code) => logger.info(`About to exit with code ${code}`));

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

        await wait(2000);

    } catch (error) {
        logger.error(error);
        process.exit(1);
    } finally {
        process.exit();
    }
}
