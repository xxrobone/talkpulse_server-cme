require('dotenv').config(); 
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const verifyEmail = async (username: string, email: string, token: string) => {
    console.log(`Verifying email for username: ${username}, token: ${token}`);
    try {
        const encodedUsername = encodeURIComponent(username);
        const encodedToken = encodeURIComponent(token);

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Hello ${username} please verify your email to gain access to Tchat and activate your account by clicking the link`,
            html: `${process.env.BASE_URL}/verify-account/${encodedUsername}/${encodedToken}`,
        }, (error: any, result: any) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: ", result.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}