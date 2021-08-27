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
        console.log('Connected comments');
    }
});
const route = express.Router();


route.use(express.json());


route.get('/comments', (req, res) => {
    // prikaz svih komentara
    connection.query("SELECT * FROM todolist_comment", function (error,rows) {
        if(!!error){
            res.status(500).send(error.sqlMessage);
            console.log('ERROR IN THE QUERY');
        }else{
            res.send(rows);
        }
    })
});

route.post('/comments/new', function (req, res) {
    // dodavanje novog komentara

    var comment = {
        // user: req.body.user,
        content: req.body.content,
        views_count: req.body.views_count
    }

    connection.query('INSERT INTO todolist_comment SET ?', comment, function (err,rows) {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
        console.log("Successfully saved.");
    })

});

route.delete('/comment/:id', (req, res) => {
    // brisanje odredjenog komentara
    let query = 'select * from todolist_comment where id=?';
    let formated = mysql.format(query, [req.params.id]);

    connection.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let comment = rows[0];

            let query = 'delete from todolist_comment where id=?';
            let formated = mysql.format(query, [req.params.id]);

            connection.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(comment);
            });
        }
    });
});

route.put('/comment/:id', (req, res) => {
    //editovanje odredjenog komentara
    let query = "update todolist_comment set content=?,views_count=? where id=?";
    let formated = mysql.format(query, [req.body.content, req.body.views_count,req.params.id]);

    connection.query(formated, (err, response) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            query = 'select * from todolist_comment where id=?';
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