const { LOG_LEVEL = 'debug' } = process.env;

/**
 * @type {string[]}
 */
const levels = [
    'debug',
    'verbose',
    'info',
    'warn',
    'error',
    'critical'
];

const minimal = levels.indexOf(LOG_LEVEL);

/**
 * Placeholder for an actual logger
 * @property {function} debug
 * @property {function} verbose
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} critical
 */
module.exports = Object.assign(
    ...levels.map(
        (key) => ({
            [key]: function log(item) {
                if (levels.indexOf(key) < minimal) {
                    return;
                }

                const record = {
                    level: key,
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

                console.log(JSON.stringify(record));
            }
        })
    )
);
