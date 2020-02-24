#!/usr/bin/env node
const { join } = require('path');
const logger = require('./lib/logger');
const config = require('./lib/config');
const run = require('.');

start();

process.on('unhandledRejection', ({message, stack, code}) => console.log({
    level: 'error',
    message,
    stack,
    code
}));

async function start() {
    try {
        const {
            categories,
            email,
            lightHouseApiKey,
            strategies
        } = config();
        const pages = require(join(__dirname, 'configuration/pages.json'));

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