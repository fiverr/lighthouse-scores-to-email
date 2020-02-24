const dataFromApi = require('../../fixtures/dataFromApi');
const email = require('../../fixtures/emailConfig.json');

let sendEmail;
const sendMail = jest.fn((options, cb) => cb());

describe('sendEmail', () => {
    beforeAll(() => {
        jest.mock('nodemailer', () => ({
            createTransport: jest.fn()
        }));

        require('nodemailer').createTransport.mockImplementation(
            () => ({
                sendMail,
                use: () => null
            })
        );

        sendEmail = require('.');
    });
    afterAll(() => {
        jest.unmock('nodemailer');
    });

    it('should send email with the results', async() => {
        const { sendMail } = require('nodemailer').createTransport();

        await sendEmail({ email, dataFromApi });

        const [ [ options ] ] = sendMail.mock.calls;

        expect(
            options
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