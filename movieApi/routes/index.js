var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();
/* GET home page. */
const bcrypt = require('bcrypt-nodejs');

const randToken = require('rand-token');
router.post('/register', (req, res)=>{
	// console.log(req);

	
	const password = req.body.password;
	const hashedPassword = bcrypt.hashSync(password);
	const email = req.body.email;
	console.log("email and passwrod ",email,password);
	// res.json("test")

	const insertUserQuery = `INSERT into users
		(email, password, token)
			VALUES
		(?, ?, ?)`;
		const token = randToken.uid(60);
		connection.query(insertUserQuery, [email, hashedPassword,token],(error, results)=>{
			if(error){throw error;}
			res.json({
				token,
				msg:"registerSuccess"
			})
		});
});

router.post('/addFav',(req,res)=>{
	const movieToAdd = req.body.movieId;
	const userToken = req.body.token;
 const getUser = `SELECT id FROM users WHERE token = ?`
  console.log("movie ",movieToAdd)
 connection.query(getUser, [userToken],(error, results)=>{
 	if(error){throw error;}
 	if(results.length > 0){
 		const insertQuery = `INSERT INTO favorites
	(mid,uid)
			VALUES
			(? ,?)`;
		connection.query(insertQuery, [movieToAdd,
			 results[0].id],(error2,results2)=>{
			 	res.json({
			 		msg:"favAdded",
			 		user: results[0].id
			 	})
			 })
 	}else{
 		res.json({
 			msg:"badToken"
 		})
 	}
 })
	
	// res.json(req.body)
})
module.exports = router;
