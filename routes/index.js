var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();
/* GET home page. */
router.post('/register', (req, res)=>{
	console.log(req);
	const password = req.body.password;
	const email = req.body.email;
	console.log("email and passwrod ",email,password);
	res.json("test")

	const insertUserQuery = `INSERT into users
		(email, password, token)
			VALUES
		(?, ?, ?)`;
		connection.query(insertUserQuery, [email, password,""],(error, results)=>{
			if(error){throw error;}
			res.json("User inserted")
		})
});

module.exports = router;
