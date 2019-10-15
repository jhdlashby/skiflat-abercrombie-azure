const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');


app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/photos'));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

router.get('/apartment', function (req, res) { 
    res.sendFile(path.join(__dirname + '/html/apartment.html'));
});

router.get('/flachau', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/flachau.html'));
});

router.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/contact.html'));
});

var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'jhdlashby@outlook.com',
        pass: '31m031m0'
    }
});

router.post('/handleform', function (req, res) {
    data = req.body;

    res.redirect('/contact');

    var mailOptions = {
        from: 'jhdlashby@outlook.com',
        to: 'jhdlashby@gmail.com',
        subject: 'Test for skiflat.com',
        text: ' Name: ' + data.name + '\n Email: ' + data.email + '\n Phone: ' + data.phone + '\n Message: ' + data.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

});

router.get('/summer', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/summer.html'));
});

router.get('/winter', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/winter.html'));
});

router.get('/location', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/location.html'));
});

router.get('/termsandconditions', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/termsandconditions.html'));
});

var lang = 'english';

router.post('/setlang', (req, res) => {
    lang = req.body.lang;
});

router.get('/getlang', function (req, res) {
    res.send(lang);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router);

app.listen(process.env.PORT);

console.log('Running at Port 3000');