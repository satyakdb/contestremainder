var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thumatipavanchowdary@gmail.com', // Your Gmail email address
        pass: 'ysmciybvluqnkoep' // Your Gmail password or an App Password if 2-factor authentication is enabled
    }
});

var mailOptions = {
    from: 'thumatipavanchowdary@gmail.com', // Your Gmail email address
    to: 'thumatipavanchowdary@gmail.com', // The recipient's email address
    subject: 'Sending Email using Node.js',
    text: 'era'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
