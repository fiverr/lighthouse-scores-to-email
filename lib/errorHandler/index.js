const logger = require('../logger');

process.on(
    'unhandledRejection',
    (error) => {
        const { message, stack, code } = error;
        console.log(
            JSON.stringify({
                level: 'error',
                message,
                stack,
                code,
                ...error
            })
        );
    }
);

process.on(
    'exit',
    (code) => logger.info(
        `About to exit with code ${code}`
    )
);
