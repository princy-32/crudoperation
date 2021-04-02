const mongoose= require('mongoose'); 
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    saltString:String
});

// userSchema.pre('save',function(next){
//     bcrypt.gensalt(10,(err,salt)=>{
//         bcrypt.hash(this.password,salt,(err,hash)=>{
//               this.password=hash; 
//               this.saltString=salt;
//               next();
//         })
        
//     })

// } )
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash)=>{
            this.password = hash;
            this.saltString = salt;
            next();
        })
    })
})



userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id:this._id
    }, "ABC111",{
        expiresIn:"3600m"
    })
}

mongoose.model('user',userSchema,'ListofUser'); 