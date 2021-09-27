import nodemailer from 'nodemailer';

/**
 * Send an email.
 *
 * @param {*} req
 * @param {*} res
 */
export default function contact(req, res) {
    // set up Gmail SMTP transport
    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        secure: true
    });

    const { name, email, subject, message } = req.body;

    // connfigure email data
    const mailData = {
        from: `${name} <${email}>`,
        to: process.env.TARGET_EMAIL,
        subject: `[RM-CV] ${subject || `Message from ${name}`}`,
        text: `Sent from: ${email}

        ${message}`,
        html: `
            <p>
                <strong>${name}</strong>
                [<em>${email}</em>]

            </p>
            <p>${message}</p>
        `
    };

    // send email
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ info });
        }
    });
}
