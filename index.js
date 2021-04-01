require('./backend/config/db');
var express = require('express');
var bodyparser = require('body-parser');

var apiroutes = require ('./backend/routes/userRoutes');



var cors = require('cors');

var app =express();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(cors());



const PORT =process.env.PORT || 3000;


app.use('/',apiroutes);
app.use(express.static(__dirname+'/dist/crudapp'));

app.use((req , res, next )=>{
    res.setHeader('Access-Control-Allow-Origin' , '*' ),
    res.setHeader('Access-Control-Allow-Credentials', true),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')  ,
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')  
})


app.get('/*',function(req,res){
    res.sendFile(__dirname+'/dist/crudapp/index.html')
})


app.listen(PORT , ()=>{
    console.log('Server is running at http://localhost:'+PORT);
}); 