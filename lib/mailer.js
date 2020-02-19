
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
const config = require('../configuration/config.js');


function sendEmail(dataFromApi) {
    
    let transporter = nodemailer.createTransport({
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
          helpers: {multihelpers,getScoreColor},
          partialsDir: './views',
          layoutsDir: './views',
          defaultLayout: 'index.handlebars'
        },
        viewPath: './views',
      };


    transporter.use('compile',hbs(handlebarOptions))

    let mailOptions = {
        from: config.email.from, 
        to: config.email.to, 
        subject: config.email.subject, 
        template: 'index',
        context: {
            dataFromApi: dataFromApi,
            date: new Date().toLocaleDateString()
        }
    }  

    transporter.sendMail(mailOptions, function(err,info) {
        if(err) {
            console.log('Error', err) 
        } else {
            console.log("Message sent!!!")
        }
    })
} 

const getScoreColor = function (score) {
    switch (true) {
        case (score >= 90)  : {
            return '#2ecc71';
        }
        case (score >= 50 && score < 89) : {
            return '#f39c12';
        }
        case (score < 49) : {
            return '#c0392b';
        }
    }
}

exports.sendEmail = sendEmail;