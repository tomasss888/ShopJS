
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




exports.indexProduct = (req, res) => {

    var cartCount;
    if(req.cookies.jwt ){
    var currentID = req.cookies.jwt.id;
    db.query("SELECT * FROM `product_cart` WHERE `user_id` = ?", [currentID], function(err,result_cartCount){
        if(err)
            throw err;
        else {

            cartCount = result_cartCount.length
                //res.render('contacts.ejs', { contacts: result });  
        }
    });
    }

    
    console.log("Getting post from database...")
    var query = "select * from product";
    db.query(query,function(err,result){
        if(err)
            throw err;
        else {

            if(!req.cookies.jwt ){
                res.status(200).render('index', { title: 'index', product: result});
              }
              else{
                res.status(200).render('index', { title: 'index', name: req.cookies.jwt.username , role : currentID, product: result, cartCount: cartCount});
              }


                //res.render('contacts.ejs', { contacts: result });  
        }
    });


   
}

exports.productSpecific = (req, res) => {

    var cartCount;
    
    if(req.cookies.jwt ){
    db.query("SELECT * FROM `product_cart` WHERE `user_id` = ?", [req.cookies.jwt.id], function(err,result_cartCount){
        if(err)
            throw err;
        else {

            cartCount = result_cartCount.length
                //res.render('contacts.ejs', { contacts: result });  
        }
    });
    }

    id = req.params.id;

    console.log("Getting post from database...")

    db.query("select * from product WHERE `id` = ?", [id] ,function(err,result){
        if(result[0] === undefined)
            res.status(404).render('product_error');
        else {

            if(!req.cookies.jwt ){
                res.status(201).render('product', { title: result.name, product: result});
              }
              else{
                res.status(201).render('product', { title: result.name, name: req.cookies.jwt.username , role : req.cookies.jwt.role, product: result, cartCount: cartCount});
              }
              
        }
    });


   
}

