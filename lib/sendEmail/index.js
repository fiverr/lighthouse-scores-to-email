const { join } = require('path');
const { createTransport } = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const capitalize = require('../capitalize');
const getScoreColor = require('../getScoreColor');
const linkToPageSpeed = require('../linkToPageSpeed');

module.exports = function sendEmail({ email, dataFromApi }) {
    const {
        host,
        port,
        secure,
        authUser: user,
        authPassword: pass,
        from,
        to,
        subject,
        list
    } = email;

    const transporter = createTransport({
        host,
        port,
        secure, // use SSL
        auth: { user, pass }
    });

    const handlebarOptions = {
        viewEngine: {
            helpers: {
                capitalize,
                getScoreColor,
                linkToPageSpeed
            },
            partialsDir: join(__dirname, '../../', 'views'),
            layoutsDir: join(__dirname, '../../', 'views'),
            defaultLayout: 'index.handlebars'
        },
        viewPath: join(__dirname, '../../', 'views')
    };


    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from,
        to,
        subject,
        template: 'index',
        context: {
            dataFromApi,
            date: new Date().toLocaleDateString(),
            list
        }
    };

    return sendMail(transporter, mailOptions);
};

const sendMail = (transporter, options) => new Promise(
    ((resolve, reject) => {
        transporter.sendMail(
            options,
            (error, info) => error
                ? reject(error)
                : resolve(info)
        );
    })
);
