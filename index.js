const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const nodeMailer = require('nodemailer');

const app = express();



const customers = require("./routes/customers");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/customers', customers);

app.use(notFound);
app.use(errorHandler);

app.post('/generate-email', (req, res) => {

    console.log(req.body);


    let transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: "'Makello - No Reply' <no-reply@makello.com>",
        to: req.body.to,
        bcc: req.body.bcc,
        subject: req.body.subject,
        text: req.body.body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

});

// eslint-disable-next-line
function notFound(req, res, next) {
    const url = req.originalUrl
    if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
        // Don't log less important (automatic) browser requests
        console.error('[404: Requested file not found] ', url)
    }
    res.status(404).send({error: 'Url not found', status: 404, url})
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);