var express = require ('express');

var useCtrl = require('../controller/usercontroller');

var jwthelper = require('../config/jwtHelper');

var routes = express.Router();

routes.post('/newuser',useCtrl.addUser);
routes.post('/auth',useCtrl.authenticate);
routes.get('/profile',jwthelper.verifytoken,useCtrl.userProfile);
routes.get('/SelectUser/:id',useCtrl.selectedUser );
routes.post('/uploads',useCtrl.uploadImage);

routes.get('/file',useCtrl.fileupload);

routes.put('/update/:id',useCtrl.updateRecord);

routes.delete('/delete/:id',useCtrl.deleteData);

module.exports = routes;