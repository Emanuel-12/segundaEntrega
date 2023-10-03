const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String
}, { collection: 'usuarios' });

const Usuario = mongoose.model('usuario', UsuariosSchema);

module.exports = Usuario;