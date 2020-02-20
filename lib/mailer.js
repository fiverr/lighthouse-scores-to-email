
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const hbshelpers = require('handlebars-helpers');

const config = require('../configuration/config.js');
const getScoreColor = require('./getScoreColor');
const logger = require('./logger');

const multihelpers = hbshelpers();


function sendEmail(dataFromApi) {

    const transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure, // use SSL
        auth: {
            user: config.email.authUser,
            pass: config.email.authPassword
        }
    });

    const handlebarOptions = {
        viewEngine: {
            helpers: {multihelpers, getScoreColor},
            partialsDir: './views',
            layoutsDir: './views',
            defaultLayout: 'index.handlebars'
        },
        viewPath: './views'
    };


    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: config.email.from,
        to: config.email.to,
        subject: config.email.subject,
        template: 'index',
        context: {
            dataFromApi,
            date: new Date().toLocaleDateString()
        }
    };

    transporter.sendMail(
        mailOptions,
        (error, info) => error
            ? logger.error(error)
            : logger.info('Message sent!!!', JSON.stringify(info, null, 2))
    );
}

exports.sendEmail = sendEmail;