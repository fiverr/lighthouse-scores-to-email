const dataFromApi = require('../../fixtures/dataFromApi');
const email = require('../../fixtures/emailConfig.json');

let sendEmail;

describe('sendEmail', () => {
    beforeAll(() => {
        jest.mock('nodemailer', () => ({
            createTransport: jest.fn()
        }));

        require('nodemailer').createTransport.mockImplementation(
            () => ({
                sendMail: (options) => options,
                use: () => null
            })
        );

        sendEmail = require('.');
    });
    afterAll(() => {
        jest.unmock('nodemailer');
    });

    it('should send email with the results', () => {
        expect(
            sendEmail({ email, dataFromApi })
        ).toEqual({
            context: {
                dataFromApi,
                date: new Date().toLocaleDateString()
            },
            from: email.from,
            to: email.to,
            subject: email.subject,
            template: 'index'
        });
    });
});