const mongoose = require('mongoose');

const ProductosSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    descripcion: String,
    stock: Boolean
}, { collection: 'productos' });

const Producto = mongoose.model('producto', ProductosSchema);

module.exports = Producto;