var express = require('express');
var router = express.Router();


const authController = require('../controllers/auth')
const productController = require('../controllers/product')
const cartController = require('../controllers/cart')

/* GET home page. 
router.get('/', function(req, res, next) {

  if(!req.cookies.jwt ){
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect("/indexLogged");
  }

});

*/

router.get('/', productController.indexProduct)
router.get('/product/:id', productController.productSpecific)
router.get('/cart', cartController.createCart)
router.get('/cart/add/:id', cartController.addToCart)
router.get('/cart/delete/:id', cartController.delete)

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
  res.redirect('/')
})

router.get('/logout',(req,res)=>{

  res.cookie('jwt', "", -1);
  res.redirect('/login');
})




module.exports = router;
