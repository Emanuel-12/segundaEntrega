const Admin=require('../models/adminModel');

exports.getAllAdmins=async (req,res)=>{
    try{
        const administradores=await Admin.find();
        res.status(200).json(administradores);
    }catch(err){
        res.status(500).json({error:"error al obtener lista de administradores"});
    }
}

exports.getAdminById=async (req,res)=>{
    try{
        const administrador=await Admin.findById(req.params.id);
        if(!administrador){
            return res.status(404).json({error:"administrador no encontrado"});
        }
        res.status(200).json(administrador);
    }catch(err){
        res.status(500).json({error:"error al obtener administrador"});
    }
}

exports.updateAdmin=async (req,res)=>{
    try{
        const administradorId=req.params.id;
        const administradorActualizado=await Admin.findByIdAndUpdate(
            administradorId,
            req.body,
            {new:true}
            );
        if(!administradorActualizado){
            return res.status(404).json({error:"administrador no encontrado"});
        }
        res.status(200).json(administradorActualizado);
    }catch(err){
        res.status(500).json({error:"error al actualizar administrador"});
    }
}

exports.deleteAdmin=async (req,res)=>{
    try{
        const administradorId=req.params.id;
        const administradorEliminado=await Admin.findByIdAndDelete(administradorId);
        if(!administradorEliminado){
            return res.status(404).json({error:"administrador no encontrado"});
        }
        res.status(200).json(administradorEliminado);
    }catch(err){
        res.status(500).json({error:"error al eliminar administrador"});
    }
}

exports.createAdmin=async (req,res)=>{
    try{
        const nuevoAdministrador=await Admin.create(req.body);
        await nuevoAdministrador.save();
        res.status(201).json(nuevoAdministrador);
    }catch(err){
        res.status(500).json({error:"error al crear administrador"});
    }
}











