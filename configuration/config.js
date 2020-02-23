const config = {
    categories : ['performance', 'seo', 'accessibility', 'best-practices'],
    strategies: ['mobile', 'desktop'],
    email : {
        from : process.env.EMAIL_FROM || 'Fred Foo 👻 ',
        to : process.env.EMAIL_TO || '',
        subject: process.env.EMAIL_SUBJECT || 'Google LightHouse Report ✔',
        host: process.env.HOST || 'smtp.gmail.com',
        port : parseInt(process.env.PORT, 10) || 465,
        secure: process.env.SECURE || true,
        authUser: process.env.AUTH_USER || '',
        authPassword: process.env.AUTH_PASSWORD || ''
    },
    lightHouseApiKey: process.env.APIKEY || ''

};

module.exports = config;
