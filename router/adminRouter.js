const express = require('express');
const route = express.Router();
const AdminController = require('../controllers/adminController');


route.get('/', AdminController.getAllAdmins);


route.get('/:id', AdminController.getAdminById);


route.post('/', AdminController.createAdmin);

route.put('/:id', AdminController.updateAdmin);

route.delete('/:id', AdminController.deleteAdmin);


module.exports = route;







