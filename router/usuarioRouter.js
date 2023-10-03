const express = require('express');
const route = express.Router();
const usuarioController= require('../controllers/usuarioController');

route.get('/', usuarioController.getAllusuario);

route.post('/email', usuarioController.getusuarioById);

route.post('/', usuarioController.crearusuario);

route.put('/:id', usuarioController.updateusuario);

route.delete('/:id', usuarioController.deleteusuario);


module.exports = route;