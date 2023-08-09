const nodemailer = require('nodemailer')

class MailService {
    async SendActivationMail(email, generatedOTP) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'sherbakov20041@gmail.com',
                    pass: 'dpaonlvypgycvfbx'
                }
            });
            const mailOptions = {
                from: 'sherbakov20041@gmail.com',
                to: email,
                subject: 'For Verification mail',
                html: `
                <p>Your code</p><p style="color: tomato; font-size: 25px; letter-spacing: 2px;">
                <b>${generatedOTP}</b></p>
                `
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email has been sent:- ", info.response);
                }
            })

        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new MailService();