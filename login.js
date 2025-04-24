import express from 'express';
import con from './db.js';
import rotp from './otp.js';
import nodemailer from 'nodemailer';
const router = express.Router();
router.post('/loginpage/otp1', (req, res) => {
    let eotp = req.body.otp;
    if (eotp == rotp) {
        res.render('home/reset', { email: req.session.e1 });
    }
})

router.post('/loginpage/otp', (req, res) => {
    let eotp = req.body.otp;
    if (eotp == rotp) {

        res.redirect('/upload');
    }
})
// reset data handler
router.post('/loginpage/reset', (req, res) => {
    let newpass = req.body.pass1;
    let user = req.body.username;
    const sql = `UPDATE userdata SET password = ? WHERE email = ? OR username = ?`;
    const values = [newpass, user, user];

    // Perform the update query
    con.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating record:', error);
            throw error;
        }
        console.log("updated!");
        res.render('home/index', { name1: req.session.user1 });
    });
})
router.post('/loginpage/otp2', (req, res) => {
    res.sendFile('login/otp4')
    let user = req.body.username;
    req.session.e1 = req.body.username;
    // nodemailer cretae transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Gmail SMTP
        auth: {
            user: 'einsteinrawat499@gmail.com', // Your Gmail address
            pass: 'zxtguhdtexlffixc'   // Your Gmail password (or an router Password if 2FA is enabled)
        }
    });
    // Email options
    let mailOptions = {
        from: 'einsteinrawat499@gmail.com',         // Sender address
        to: user,    // List of recipients
        subject: 'OTP',        // Subject line
        text: `your OTP is ${rotp}`, // Plain text body
        html: `<b>your OTP is ${rotp}</b>` // HTML body
    };    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
})
// otp data sent 
router.post('/loginpage/otp4', (req, res) => {
    req.session.u = req.body.username1;
    req.session.pass = req.body.password1;
    req.session.p = req.body.phone;
    req.session.e = req.body.email;
    res.sendFile('login/otp3');
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Gmail SMTP
        auth: {
            user: 'einsteinrawat499@gmail.com', // Your Gmail address
            pass: 'zxtguhdtexlffixc'   // Your Gmail password (or an router Password if 2FA is enabled)
        }
    });
    // Email options
    let mailOptions = {
        from: 'einsteinrawat499@gmail.com',         // Sender address
        to: req.session.e,    // List of recipients
        subject: 'OTP',        // Subject line
        text: `Your OTP is ${rotp}`, // Plain text body
        html: `<b>your OTP is ${rotp}</b>` // HTML body
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });

})
export default login