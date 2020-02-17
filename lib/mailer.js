
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();

function sendEmail(dataFromApi) {

    // dataFromApi = [ { requestedUrl: 'https://www.fiverr.com/categories/graphics-design/creative-logo-design',
    // fetchTime: '2020-02-16T14:43:32.662Z',
    // strategy: 'desktop',
    // pageName: 'Category Page',
    // details: [
    // { name: 'pwa', score: 31 },
    // { name: 'performance', score: 47 },
    // { name : 'accessibility', score: 68 },
    // { name: 'best-practices', score: 69 },
    // { name: 'seo',  score: 91 } ] },
    
    // { requestedUrl: 'https://www.fiverr.com/aishar/record-a-female-voice-over-in-an-american-accent',
    // fetchTime: '2020-02-16T14:44:15.940Z',
    // strategy: 'desktop',
    // pageName: 'Gig Page',
    // details: [
    //     { name: 'pwa', score: 31 },
    //     { name: 'performance', score: 40 },
    //     { name : 'accessibility', score: 72 },
    //     { name: 'best-practices', score: 69 },
    //     { name: 'seo',  score: 82 }]
    // }]

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.PASSWORD
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
        from: '"Fred Foo 👻" <ofer@gmail.com>', // sender address
        to: "", // list of receivers
        subject: "Google LightHouse Report ✔", // Subject line
        template: 'index',
        context: {
            dataFromApi: dataFromApi,
            date: new Date().toLocaleDateString()
        }
    }  

       
    // send mail with defined transport object
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
        case (score >= 80)  : {
            return '#2ecc71';
        }
        case (score >= 50 && score < 79) : {
            return '#f39c12';
        }
        case (score < 49) : {
            return '#c0392b';
        }
    }
}

exports.sendEmail = sendEmail;