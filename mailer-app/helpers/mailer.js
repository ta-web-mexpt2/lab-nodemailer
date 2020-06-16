const nodemailer = require("nodemailer");
const fs = require("fs");
const hbs = require("hbs");

const transporter = nodemailer.createTransport({
    service: "SendGrid", 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const generateHTML = (filename, options) => {
    const html = hbs.compile(
        fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), "utf-8")
    );
    return html(options);
};

exports.send = options => {
    const html = generateHTML(options.filename, options) 
    const mailOptions = {
        from: "Karen's support <noreply@karen.com",
        to: options.email,
        subject: options.subject, 
        message: options.message,
        html    
    };
    return transporter.sendMail(mailOptions);
};