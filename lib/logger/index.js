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
    ...[
        'debug',
        'verbose',
        'info',
        'warn',
        'error',
        'critical'
    ].map(
        (key) => ({
            [key]: function log(item) {
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
                        record.message = error.message;
                        record.stack = error.stack;
                        record.code = error.code;
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
