const nodemailer = require("nodemailer");
const hbs = require("hbs");
const fs = require("fs");


const generateHTML = (filename, options) => {
    const hbsHTML = hbs.compile(
        fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), "utf-8")
    )
    return hbsHTML(options);
}

const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD,
    },
});

exports.sendMail = (options) => {
    const { filename } = options;
    // Generate html
    const html = generateHTML(filename, options);
    const mailOptions = {
        from: options.from,
        to: options.email,
        subject: options.subject,
        message: options.message,
        html
    };
    console.log("Enviando...");
    return transporter.sendMail(mailOptions);
}