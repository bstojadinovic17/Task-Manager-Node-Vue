const express = require('express')


const secretKey = 'sabogi99'
const passHash = require('password-hash')
const jwt = require('jsonwebtoken')

const Joi = require('joi')
const mysql = require('mysql')

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
        console.log('Connected auth');
    }
});
const router = express.Router();


router.use(express.json());


const sema = Joi.object().keys({
    username: Joi.string().trim().min(1).max(12).required(),
    password: Joi.string().trim().min(1).max(25).required(),
})


router.post('/register', function (req, res) {

    let { error } = Joi.validate(req.body, sema)

    if(error)
        res.status(400).send(error.details[0].message)
    else{
        query = "insert into auth_user (username, password) values (?, ?)"
        let password = passHash.generate(req.body.password)
        let formated = mysql.format(query, [req.body.username, password])

        connection.query(formated, function (err, response) {
            if(err)
                res.status(500).send(err.sqlMessage)
            else{
                query = 'select * from auth_user where id=?'
                formated = mysql.format(query, [response.insertId])

                connection.query(formated, function (err, rows) {
                    if(err)
                        res.status(500).send(err.sqlMessage)
                    else{
                        res.send(rows[0])
                    }
                })
            }
        })
    }

})

router.post('/login', function (req, res) {
    let { error } = Joi.validate(req.body, sema)

    if(error)
        return res.status(400).send(error.details[0].message)
    else{
        query = 'select * from auth_user where username=?'
        formated = mysql.format(query, [req.body.username])

        connection.query(formated, function (err, rows) {
            if(err){
                return res.status(400).send(err)
            } else {
                if(rows[0] == null){
                    return res.status(400).send("Username doesnt exist.")
                }

                if( passHash.verify(req.body.password, rows[0].password)){
                    const token = jwt.sign({_id: rows[0].id}, secretKey)
                    return res.set({'auth':token, 'user': rows[0].username}).send({id: rows[0].id, token: token, username: rows[0].username})
                } else {
                    return res.status(400).send("Password doesn't match")
                }

                return res.status(200).send("Login is successsfull.")
            }

        })
    }
})

module.exports = router