const levelheaded = require('levelheaded');

const { LOG_LEVEL = 'debug' } = process.env;
const { NODE_ENV = 'production' } = process.env;

const indentation = NODE_ENV.toLowerCase().startsWith('dev') ? 2 : 0;

/**
 * Placeholder for an actual logger
 * @property {function} debug
 * @property {function} verbose
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} critical
 */
module.exports = levelheaded({
    minimal: LOG_LEVEL,
    action: function log(item) {
        const record = {
            level: this.level,
            time: Date.now(),
            context: [
                `work dir: ${process.cwd()}`,
                `dirname: ${__dirname}`
            ].join('\n')
        };

        if (typeof item === 'string') {
            record.message = item;
        }

        if (typeof item === 'object') {
            if (item instanceof Error) {
                record.message = item.message;
                record.stack = item.stack;
                record.code = item.code;
            }
            Object.assign(
                record,
                item
            );
        }

        console.log(JSON.stringify(record, null, indentation));
    }
});
