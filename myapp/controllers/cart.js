
var express = require('express');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
const { connect } = require('../routes');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopjs'
});




exports.createCart = (req, res) => {


    var cartCount;

    db.query("SELECT * FROM `product_cart` WHERE `user_id` = ?", [req.cookies.jwt.id], function(err,result_cartCount){
        if(err)
            throw err;
        else {

            cartCount = result_cartCount.length
                //res.render('contacts.ejs', { contacts: result });  
        }
    });



    db.query("SELECT * FROM `product_cart` WHERE `user_id` = ?", [req.cookies.jwt.id],function(err,result_product_cart){
        if(err)
            throw err;
        else {

            var arrOfVals = [];
            let count = 0;
            for( var obj in result_product_cart ) {
                arrOfVals.push( result_product_cart[count].product_id );
                count++;
            }

            console.log(arrOfVals);

            //if empty
            if(result_product_cart.length == 0){
                res.render('cart', { title: 'Cart', name: req.cookies.jwt.username , role : req.cookies.jwt.role, cartCount: cartCount});
                return;
            }


            db.query("SELECT * FROM `product` WHERE `id` IN (?)", [arrOfVals],function(err,result_Product){
                if(err)
                    throw err;
                else {

                    let sum = 0;

                    let count = 0;
                    for( var obj in result_Product ) {
                        sum = sum + result_Product[count].price;
                        count++;
                    }
                    sum= parseFloat(sum).toFixed(2);


                    res.render('cart', { title: 'Cart', name: req.cookies.jwt.username , role : req.cookies.jwt.role, cartCount: cartCount, cart: result_Product, sum:sum});
                      
        


                }
            });
        
        }
    });


   
}

exports.addToCart = (req, res) => {

    id = req.params.id;
    db.query('INSERT INTO `product_cart` SET ?', {product_id: id, user_id: req.cookies.jwt.id}, (error,results) => {
        if(error){
            console.log(error);
        }

        res.redirect('/cart');
       
    })
}

exports.delete = (req, res) => {

    id = req.params.id;

    var query = "DELETE FROM `product_cart` WHERE product_id = ?";
    db.query(query,[id] ,function(err,result){
        if(err)
            throw err;
        else {
            res.redirect('/cart');
        }
    });

   
}