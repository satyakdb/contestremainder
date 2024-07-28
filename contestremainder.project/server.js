const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();


app.set('trust proxy', true);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const recipent = req.body.recipent;
    const sub = req.body.sub;
    const msg = req.body.msg;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'thumatipavanchowdary@gmail.com',
            pass: 'ysmciybvluqnkoep'
        }
    });

    var mailOptions = {
        from: 'thumatipavanchowdary@gmail.com',
        to: recipent,
        subject: sub,
        text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.status(500).send("Error in sending email: " + error.message);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Email sent successfully.");
        }
    });
});


//datastoringpersonsdetails

const mysql = require('mysql2');


const conc = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pavan@2114101",
    database: "Personinfo",

});


app.use(express.urlencoded({ extended: true }));
app.post('/insert', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    const sql = " INSERT INTO info (Username,Email, Passwords) VALUES (?, ?, ?)";
    const values = [username, email, password];
    conc.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting record." + err.message);
        } else {
            console.log(result.affectedRows + " record(s) inserted");
            res.send("Record inserted successfully.");
        }
    });

});

//datastoringpersonsdetails
//loginchecking
app.post('/check', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT COUNT(*) AS count FROM Info WHERE Email = '${email}' AND Passwords = '${password}';`;

    conc.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error executing query: " + err.message);
        } else {

            const count = result[0].count;
            if (count > 0) {

                res.send("Record exists. Redirecting...");
            } else {

                res.send("Record does not exist.");
            }
        }
    });
});


//loginchecking
//registerchecking
app.post('/registercheck', (req, res) => {
    const email = req.body.email;


    const sql = `SELECT COUNT(*) AS count FROM info WHERE Email = '${email}' ;`;

    conc.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error executing query: " + err.message);
        } else {

            const count = result[0].count;
            if (count > 0) {

                res.send("Record exists. Redirecting...");
            } else {

                res.send("Record does not exist.");
            }
        }
    });
});
//registerchecking
//contestdetailsinfo

app.post('/insertinfo', (req, res) => {
    const cn = req.body.Contestname;
    const cd = req.body.Contestdate;
    const ct = req.body.Contesttime;


    const sql = "  INSERT INTO Contestinfo (Contestname,Contestdate, Contesttime) VALUES (?, ?, ?)";
    const values = [cn, cd, ct];
    conc.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting record." + err.message);
        } else {
            console.log(result.affectedRows + " record(s) inserted");
            res.send("Record inserted successfully.");
        }
    });

});
app.post('/insertcheck', (req, res) => {
    const cdate=req.body.Contestdate;
    const ctime=req.body.Contesttime;

    const sql = `SELECT COUNT(*) AS count FROM Contestinfo WHERE Contestdate = '${cdate}' AND Contesttime ='${ctime}';`;

    conc.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error executing query: " + err.message);
        } else {

            const count = result[0].count;
            if (count > 0) {

                res.send("Record exists. Redirecting...");
            } else {

                res.send("Record does not exist.");
            }
        }
    });
});
app.get('/getArray', (req, res) => {
    const sql = "SELECT * FROM Contestinfo";
    conc.query(sql, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching records: " + err.message);
        } else {
            const array = result.map(item => ({
                Contestname: item.Contestname,
                Contestdate: item.Contestdate,
                Contesttime: item.Contesttime,
                
            }));
            res.json(array);
        }
    });
});
//contestdetailsinfo
// removingdata
app.post('/removedata', (req, res) => {
    const cna = req.body.Contestname;
    const cda = req.body.Contestdate;
    const cti = req.body.Contesttime;

   
   
    const sqlDelete = `DELETE FROM Contestinfo WHERE Contestname =  '${cna}' and Contestdate='${cda}' and Contesttime='${cti}';`;

    

    conc.query(sqlDelete, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error removing record." + err.message);
        } else {
            res.send("Record removed successfully.");
        }
    });
});

// removingdata
//checking data continuosly
app.post('/checkData', (req, res) => {
    const cdat = req.body.currentdate;
    const ctim = req.body.currenttime;
    const sql = `SELECT * FROM Contestinfo WHERE Contestdate = ? AND Contesttime = ?`;
    
    conc.query(sql, [cdat, ctim], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching records: " + err.message);
        } else {
            const array = result.map(item => ({
                Contestname: item.Contestname,
                Contestdate: item.Contestdate,
                Contesttime: item.Contesttime,
            }));
            
            res.json(array);
        }
    });
});
//checking data continuosly
app.listen(4123, () => {
    console.log(`Server is running on port 4123`);
});

