const Producto=require('../models/productoModel');


exports.getAllProductos=async (req,res)=>{
    try{
        const productos=await Producto.find();
        res.status(200).json(productos);
    }catch(err){
        res.status(500).json({error:"error al obtener lista de productos"});
    }
}


exports.getAllProductoById=async (req,res)=>{
    try{
        const producto=await Producto.findById(req.params.id);
        if(!producto){
            return res.status(404).json({error:"producto no encontrado"});
        }
        res.status(200).json(producto);
    }catch(err){
        res.status(500).json({error:"error al obtener producto"});
    }
}


exports.createProducto=async (req,res)=>{
    try{
        const nuevoProducto=await Producto.create(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    }catch(err){
        res.status(500).json({error:"error al crear producto"});
    }
}

exports.deleteProducto=async (req,res)=>{
    try{
        const productoId=req.params.id;
        const productoEliminado=await Producto.findByIdAndDelete(productoId);
        if(!productoEliminado){
            return res.status(404).json({error:"producto no encontrado"});
        }
        res.status(200).json(productoEliminado);
    }catch(err){
        res.status(500).json({error:"error al eliminar producto"});
    }
}

exports.updateProducto=async (req,res)=>{
    try{
        const productoId=req.params.id;
        const productoActualizado=await Producto.findByIdAndUpdate(productoId,req.body,{new:true});
        if(!productoActualizado){
            return res.status(404).json({error:"producto no encontrado"});
        }
        res.status(200).json(productoActualizado);
    }
    catch(err){
        res.status(500).json({error:"error al actualizar producto"});
    }
}



