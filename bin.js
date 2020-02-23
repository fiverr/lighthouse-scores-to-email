#!/usr/bin/env node
const { join } = require('path');
const logger = require('./lib/logger');
const run = require('.');

start();

async function start() {
    try {
        const {
            categories,
            email,
            lightHouseApiKey,
            strategies
        } = require('./configuration/config.js');
        const pages = require(join(process.cwd(), 'configuration/pages.json'));

        await run({
            categories,
            email,
            lightHouseApiKey,
            pages,
            strategies
        });

    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}