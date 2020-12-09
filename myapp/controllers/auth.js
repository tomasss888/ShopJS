var express = require('express');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopjs'
});



exports.login = async (req, res) => {
    
    try{
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
        }
        db.query('SELECT * FROM users WHERE username = ?', [username], async (error,results) => {
            
            if(results[0] === undefined){
                res.status(401).render('login', {
                    message: 'Username or password is incorrect'
                })
            }
            

            bcrypt.compare(password, results[0].password, function(err, result) {
                if (err) { 
                    res.status(401).render('login', {
                        message: 'Username or password is incorrect'
                    })
                 }

            });

            if(!results )
            res.status(401).render('login', {
                message: 'Username or password is incorrect'
            })
            else{
                
                const id = results[0].id;

                //token creation
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("Token created :"+ token)

                //Cookie creation
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                let users = { 
                    id : id, 
                    username : username,
                    role : results[0].role
                } 


                res.cookie('jwt',users , token, cookieOptions );

                if(username == 'admin'){
                    res.status(200).redirect("/indexLogged");
                }
                else{
                    res.status(200).redirect("/indexLogged");
                }
                ;

            }
        })

    }
    catch(error){
        console.log(error);
    }

}



exports.register = (req, res) => {
    console.log(req.body);

    const {username , email, password} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'That email already in use'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        
        db.query('INSERT INTO users SET ?', { username: username, email: email, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error);
            }
            else {
                console.log(results);
                res.render('register', {
                    message: 'User registered'
                });
            }
        });
    }); 


   
}

