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
        const pages = require(join(__dirname, 'configuration/pages.json'));

        await run({
            categories,
            email,
            lightHouseApiKey,
            pages,
            strategies
        });

    } catch (error) {
        logger.error(JSON.stringify({
          level: 'error',
          time: Date.now(),
          message: error.message,
          stack: error.stack,
          code: error.code,
          context: [
            `work dir: ${process.cwd()}`,
            `dirname: ${__dirname}`
          ].join('\n')
        }));
        process.exit(1);
    }
}