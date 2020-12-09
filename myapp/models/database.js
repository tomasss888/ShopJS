var mongoose  = require('mongoose')  
  
//specify the fields which we want in our collection(table).  
var usersSchema = new mongoose.Schema({  
    id : Number,  
    username  : String,  
    password  : String,  
    email     : String,  
    role   : Number  
 })  

 var cartSchema = new mongoose.Schema({  
    id : Number,  
    user_id  : Number,  
    date  : Date 
 })  

 var productSchema = new mongoose.Schema({  
    id : Number,  
    name  : String,  
    about  : String,  
    price     : Number,
    count : Number
 })  

 var product_cartSchema = new mongoose.Schema({  
    id : Number,  
    cart_id  : Number,  
    product_id     : Number,  
 })  

 module.exports = mongoose.model('User', userSchema);