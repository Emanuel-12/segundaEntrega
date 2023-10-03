const express = require('express');
const route = express.Router();
const ProductoController = require('../controllers/productoController');

route.get('/', ProductoController.getAllProductos);

route.get('/:id', ProductoController.getAllProductoById);

route.post('/', ProductoController.createProducto);

route.put('/:id', ProductoController.updateProducto);

route.delete('/:id', ProductoController.deleteProducto);


module.exports = route;
