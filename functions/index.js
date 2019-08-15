const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const GmailTransportAuth = {
	user: functions.config().gmail.user,
	pass: functions.config().gmail.password
}

app.post('/sendmessage', (req, res) => {

	const mailTransport = nodemailer.createTransport({
		service: 'gmail',
		auth: GmailTransportAuth
	});

	const mailOptions = {
		from: '"' + req.body.name + '" <' + req.body.email + '>',
		to: 'rickymcgeehan@hotmail.com',
		subject: req.body.subject,
		text: '"' + req.body.name + '" <' + req.body.email + '>\n\n' + req.body.message,
		html: '<p><b>' + req.body.name + ' [' + req.body.email + ']</b></p><p>' + req.body.message + '</p>'
	};

	try {
		mailTransport.sendMail(mailOptions, function(err, info)
		{
			if(err)
			{
				console.error(err);
				return res.status(500).send(err);
			}
			
			console.log('Successfully sent email from ' + mailOptions.from + ' to ' + mailOptions.to);
			return res.send(info);	
		});
	} 
	catch (e) {
		console.error(e);
		return res.status(500).send(e);
	}
});


// NOTE: Free firebase hosting doesn't allow you to make requests to platforms outside of the Google suite.
// 		 If I ever start paying for the hosting, it would be a good idea to switch to a SendGrid implementation
// 		 rather than Gmail.
/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

app.post('/sendmessage', (req, res) => {

	const mailOptions = {
		to: 'rickymcgeehan@hotmail.com',
		from: '"' + req.body.name + '" <' + req.body.email + '>',
		subject: req.body.subject,
		text: req.body.message
	};

	try {
		sgMail.send(mailOptions).then((result) => {
			console.log('Successfully sent email from ' + mailOptions.from + ' to ' + mailOptions.to);
			return res.send(result);	
		})
		.catch(error => {
			console.error(error.toString());
			return res.status(500).send(error);
		});
	} 
	catch (e) {
		console.error(e);
		return res.status(500).send(e);
	}
});
*/

exports.api = functions.https.onRequest(app);
