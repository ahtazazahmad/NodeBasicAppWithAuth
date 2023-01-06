const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');
let config1 = {
    host:"",
    port: 465,
    secure: true,
    
    auth: {
        user: '',
        pass: ''
    }
}

// configuration of mail server
let transporter = nodemailer.createTransport(config1)
const email=(payload) => {


return new Promise((resolve, reject) => {

    let { to,info} = payload;

// setup email data with unicode symbols
const mailOptions = {
    from: config.email.user,
    to: payload.email,
    subject:payload.subject,
    ...(payload.isHtml?{html:payload.html}:{text:payload.text}),
    attachments: payload.attachments
};
    //create the path of email template folder which to send 
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    
                    return reject({ status: 5002, message: "Error while sending mailing", Response: error })
                }
                
                return resolve({ status: 2000, message: "Successfully Email Sent", Response: info });

            })


        });
}

module.exports = email;

