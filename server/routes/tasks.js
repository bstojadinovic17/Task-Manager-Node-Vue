const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    port: 3308,
    database: 'aaa'
});

connection.connect(function (error) {
    if(!!error){
        console.log(error);
    } else{
        console.log('Connected tasks');
    }
});
const route = express.Router();


route.use(express.json());


route.get('/tasks', (req, res) => {
    // prikaz svih taskova
    connection.query("SELECT * FROM todolist_task", function (error,rows) {
        if(!!error){
            res.status(500).send(error.sqlMessage);
            console.log('ERROR IN THE QUERY');
        }else{
            res.send(rows);
        }
    })
});

route.post('/newTask', function (req, res) {
    // dodavanje novog taska

        var task = {
            user_id: req.body.user_id,
            taskname: req.body.taskname,
            description: req.body.description,
            category: req.body.category
        }

    connection.query('INSERT INTO todolist_task SET ?', task, function (err,rows) {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
            console.log("Successfully saved.");
    })

});

route.delete('/task/:id', (req, res) => {
    // brisanje odredjenog taska
    let query = 'select * from todolist_task where id=?';
    let formated = mysql.format(query, [req.params.id]);

    connection.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let task = rows[0];

            let query = 'delete from todolist_task where id=?';
            let formated = mysql.format(query, [req.params.id]);

            connection.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(task);
            });
        }
    });
});

route.put('/task/:id', (req, res) => {
        //editovanje odredjenog taska
        let query = "update todolist_task set description=?,category=? ,taskname=? where id=?";
        let formated = mysql.format(query, [req.body.user, req.body.taskname,req.body.category ,req.body.description,req.params.id]);

        connection.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                query = 'select * from todolist_task where id=?';
                formated = mysql.format(query, [req.params.id]);

                connection.query(formated, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });


});
module.exports = route;