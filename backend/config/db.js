const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/projectDB",{useNewUrlParser:true })
.then(()=>{
    console.log("Database connected successfully");     
})
.catch((err)=>{
    console.log("error in connecting database"+err);
})