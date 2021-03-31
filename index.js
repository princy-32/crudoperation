require('../backend/config/db');
var express = require('express');
var bodyparser = require('body-parser');

var apiroutes = require ('../backend/routes/userRoutes');

var cors = require('cors');

var app =express();

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

app.use('/',apiroutes);

app.use(express.static(__dirname+'/dist/project/index.html') );

app.use((req , res, next )=>{
    res.setHeader('Access-Control-Allow-Origin' , '*' ),
    res.setHeader('Access-Control-Allow-Credentials', true),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')  ,
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')  
})

const port =process.env.PORT | 3000;

app.listen(port , ()=>{
    console.log('Server is running at http://localhost:'+port);
}); 