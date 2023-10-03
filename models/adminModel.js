const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String
}, { collection: 'administradores' });

const Admin = mongoose.model('administradore', AdminSchema);

module.exports = Admin;