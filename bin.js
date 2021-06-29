#!/usr/bin/env node
const { join } = require('path');
const wait = require('@lets/wait');
const logger = require('./lib/logger');
const config = require('./lib/config');
const run = require('.');
const softRequire = require('./lib/softRequire');

const CONFIGURATION_FILE_PATH = join(__dirname, 'configuration/config.json');

start();

async function start() {
    try {
        const userConfig = softRequire(CONFIGURATION_FILE_PATH);

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
