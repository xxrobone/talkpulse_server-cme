// for later use, not using it yet, working on it in dev branch
// just keeping it here too... 

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.VITE_EMAIL_TEST,
        password: process.env.VITE_TEST_EMAIL_PASSWORD
    },
})

const verifyEmail = async (username: string, email: string, token: string) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.VITE_EMAIL_TEST,
            to: email,
            subject: `Hello ${username} please verify your email and activate your account by clicking the link`,
            html: process.env.VITE_BASE_URL + "/verify-account/" + username + "/" + token,
        })
    } catch (error) {
        console.log(error)
    }
}

export default verifyEmail