const mysql = require('mysql');
var express = require('express');
var router = express.Router();


const db_creds = require('../config/config.js')
const connection = db_creds
// const connection = mysql.createConnection({
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: '',
// 	database : 'to_do'
// })
connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
	let message = req.query.msg;
	if(message === 'added'){
		message = `Your task was added!`;
	}else if(message === `deleted`){
		message = `Your task was deleted`;
	}
	// res.render('index',{title: 'Express'})\
	const selectQuery = `SELECT * FROM tasks`;

	connection.query(selectQuery, (error, results)=>{
		if(error){throw error;}
		res.render('index', { message,title: 'Express' ,taskArray: results});
	})
  
});

router.post('/addItem', (req,res)=>{
	const taskName = req.body.newTask;
	const taskDate = req.body.newTaskDate;

	const insertQuery = `
	INSERT into tasks
			(task_name, task_date)
			VALUES
			(?,?);`

			console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ READY TO RUN THE QUERY $$$$$$$$$$$$$$$$$$$$$$`);
		connection.query(insertQuery, [taskName,taskDate],(error,results)=>{
			if(error)throw error;
			console.log(`=================QUERY DID NOT ERROR< SENDING TO THE HOMEPAGE===================`);
			res.redirect('/?msg=added');
		})
});


router.get('/delete/:id',(req,res)=>{
	const idToDelete = req.params.id;
	const  deleteQuery = `DELETE FROM  tasks
				WHERE id = ?`;
		connection.query(deleteQuery,[idToDelete],(error,results)=>{
			if(error){throw error;}
			res.redirect('/?msg=deleted');
		})
})

router.get('/edit/:id',(req,res)=>{
		const idToUpdate = req.params.id;
		console.log("id to update",idToUpdate)
	res.render('edit',{id:idToUpdate});
})

router.post('/updateItem',(req,res)=>{
	const taskName = req.body.newTask;
	const taskDate = req.body.newTaskDate;
	const id = req.body.id;
	const updateQuery = `UPDATE tasks
			SET task_name = ?,
			    task_date = ?
			    WHERE id = ?`;
			connection.query(updateQuery,[taskName,taskDate, id],(error,results)=>{
				if(error)throw error;
			console.log(`=================QUERY DID NOT ERROR< SENDING TO THE HOMEPAGE===================`);
			res.redirect('/?msg=updated');
			})
})


// router.post('/addItem')
module.exports = router;
