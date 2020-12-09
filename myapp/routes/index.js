var express = require('express');
var router = express.Router();


const authController = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {

  if(!req.cookies.jwt ){
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect("/indexLogged");
  }

});

router.get('/login',(req,res)=>{
    res.render('login');
})
  

router.post('/login', authController.login)

//register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register', authController.register)
////

router.get('/indexLogged',(req,res)=>{
  res.render('index',{name: req.cookies.jwt.username , role : req.cookies.jwt.role})
})

router.get('/logout',(req,res)=>{

  res.cookie('jwt', "", -1);
  res.redirect('/login');
})




module.exports = router;
