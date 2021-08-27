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
        console.log('Connected users');
    }
});
const router = express.Router();


router.use(express.json());


router.get('/users', (req, res) => {
    // prikaz svih usera
    connection.query("SELECT * FROM auth_user", function (error,rows) {
        if(!!error){
            res.status(500).send(error.sqlMessage);
            console.log('ERROR IN THE QUERY');
        }else{
            res.send(rows);
        }
    })
});





module.exports = router