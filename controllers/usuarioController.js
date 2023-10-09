const Usuario = require('../models/usuarioModel');

exports.getAllusuario=async (req,res)=>{
    try{
        const usuarios=await Usuario.find();
        res.status(200).json(usuarios);
    }catch(err){
        res.status(500).json({error:"error al obtener lista de usuario"});
    }
}

exports.getusuarioById=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const usuario=await Usuario.findOne({email:email});
        console.log("esto es usuario|: ",usuario.password,'password: ',password);
        if(!usuario ){
            return res.status(404).json({error:"usuario no encontrado"});
        }else if(usuario.password===password){
            // res.status(201).json({msg:`Bienvenido ${usuario.nombre}`});
            res.redirect('/usuario.html');
        }else{
            res.status(404).json({error:"contraseña incorrecta"});
            // res.redirect('/public/error.html');
        }
    }catch(err){
        res.status(500).json({error:"error al obtener usuario"});
        // res.redirect('/public/error.html');
    }
}


exports.crearusuario=async (req,res)=>{
    try{
        const {emailRegistrar,passwordRegistrar,username}=req.body;
        const nuevousuario=await Usuario.create({
            email:emailRegistrar,
            password:passwordRegistrar,
            nombre:username
        });
        await nuevousuario.save();
        res.redirect('/usuario.html');
    }catch(err){
        res.status(500).json({error:"error al crear usuario"});
    }
}

exports.updateusuario=async (req,res)=>{

    try{
        const usuarioId=req.params.id;
        const usuarioActualizado=await Usuario.findByIdAndUpdate(
            usuarioId,
            req.body,
            {new:true}
            );
        if(!usuarioActualizado){
            return res.status(404).json({error:"usuario no encontrado"});
        }
        res.status(200).json(usuarioActualizado);
    }catch(err){
        res.status(500).json({error:"error al actualizar usuario"});
    }
}

exports.deleteusuario=async (req,res)=>{
    try{
        const usuarioId=req.params.id;
        const usuarioEliminado=await Usuario.findByIdAndDelete(usuarioId);
        if(!usuarioEliminado){
            return res.status(404).json({error:"usuario no encontrado"});
        }
        res.status(200).json(usuarioEliminado);
    }catch(err){
        res.status(500).json({error:"error al eliminar usuario"});
    }
}
