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
            [key]: (...args) => console.log(...args)
        })
    )
);