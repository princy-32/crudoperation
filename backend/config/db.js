const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mydb:mydb123@cluster0.9m1zt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true })
.then(()=>{
    console.log("Database connected successfully");     
})
.catch((err)=>{
    console.log("error in connecting database"+err);
})