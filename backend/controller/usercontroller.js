require('../model/usermodel');
require('../config/passportConfig');
require('../model/imageModel');

const mongoose=require('mongoose');
const passport = require('passport');


var User = mongoose.model('user');

const jwt = require('jsonwebtoken');
 const _ = require('lodash');
 var Image = mongoose.model('imageUpload');

 const multer = require('multer');

module.exports.addUser=(req,res)=>{
    var newUser=new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password,
        photo:req.filename
    });

    return newUser.save().then((docs)=>{
        res.status(200).json({
            success:true,
            message:'New User Created',
            data:docs
        });
    }).catch((err)=>{
       res.status(401).json({
            success:false,
            message:'Error in connecting',
            error:err.message
        });
    });
};

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)
        return res.status(404).json(err);
        if(user)
        return res.status(200).json({
            "token":user.generateJWT(),
            data:user
        })
        if(info)
        return res.status(401).json(info);
    })(req,res,next);
}

module.exports.userProfile=(req,res)=>{
    User.findOne({_id:req._id}).then((user)=>{
        return res.status(200).json({
            success:true,
            message:'user Found',
            data:_.pick(user,['_id','email'])
        })
    }).catch((err)=>{
        res.status(404).json({
            success:false,
            message:'user not found',
            err:err.message
        })
    })
}

module.exports.selectedUser=(req,res)=>{
  return User.findById({_id:req.params.id}).select('name email contact').then((docs)=>{
    res.status(200).json({
      success:true,
      messasge:'User Record Found',
      data:docs
    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'User not found',
      err:err.message
    })
  })
}
//update USER DETAILS
module.exports.updateRecord=(req,res)=>{
  const id = req.params.id;
  const updatedData = req.body;

  User.findByIdAndUpdate({_id:id},{$set: updatedData},{new:true}).then((docs)=>{
       return res.status(200).json({
      success:true,
      message:"User Record Updated",
      data: docs

    })
  }).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'Failed to upload ',
      err:err.message
    })
  })
}
 //delete user details
 module.exports.deleteData=(req,res)=>{
   const id =req.params.id;
  User.findOneAndRemove({_id:id}).then((user)=>{
    return res.status(200).json({
      success:true,
      message:"User Record Deleted",
   
    })
  })
}
  



//access html file


module.exports.fileupload=(req,res)=>{
    res.sendFile(__dirname+ '/form.html');
  }




//Upload  image


var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
  });

  var upload = multer({storage:storage}).single('photo');
  module.exports.uploadImage=(req,res)=>{
    upload(req,res,function(err){
      if(err)
      {
        console.log("Error in file uploading" +err);
      }
      else
      {
        console.log("File uploaded successfully");
        const image=Image({
          file:req.file.path
        });
        console.log(req.file);
        console.log(__dirname+'/uploads');    
  
        return image.save().then((docs)=>{
          res.status(200).json({
            success:true,
            message:'file uploaded successfully',
            data:docs
  
          }).catch((err)=>{
            res.status(401).json({
              success:false,
              message:'Error in uploading file',
              err:err.message
            })
          })
        })
      }
    })
  }
    