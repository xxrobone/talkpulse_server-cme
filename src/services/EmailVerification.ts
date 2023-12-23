const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.EMAIL_TEST,
        password: process.env.TEST_EMAIL_PASSWORD
    },
})

export const verifyEmail = async (username: string, email: string, token: string) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_TEST,
            to: email,
            subject: `Hello ${username} please verify your email to gain access to Tchat and activate your account by clicking the link`,
            html: process.env.BASE_URL + "/verify-account/" + username + "/" + token,
        })
    } catch (error) {
        console.log(error)
    }
}