const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoose=require('mongoose');
const app = express();  
const port=8080||process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

dotenv.config();

const MongoClient = require('mongodb').MongoClient;


const MONGO_URL_LOCAL = process.env.MONGO_LOCAL;

const MONGO_URL_ATLAS = process.env.MONGO_ATLAS;


app.post('/registrar', (req, res) => {
    let { username, emailRegistrar, passwordRegistrar } = req.body;
    if(!username || !emailRegistrar || !passwordRegistrar){
        return res.status(400).send('Faltan datos');
    }
    MongoClient.connect(MONGO_URL_ATLAS, async (err, db) => {
        if(err) throw err;
        try {
            let dbo = db.db('dbServer')
            let coleccion=dbo.collection('administradores');
           
            const usuario = await coleccion.findOne({ email:emailRegistrar });

      
            if (usuario) {
                res.status(404).send('Usuario ya existe');
            } else {
                let documento={
                    username:username,
                    email:emailRegistrar,
                    password:passwordRegistrar
                }
                console.log(documento);
                    await dbo.collection('administradores').insertOne(documento, (err, result) => {
                        if(err) throw err;
                        console.log(`Documento insertado en la colección administradores`);
                        res.redirect('./public/admin.htmlhtml');
                        db.close();
                       
                    });              
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al buscar el usuario');
        }
    })
})





app.post('/login', (req, res) => {
    let { email, password } = req.body;
    let newUser={
        email:email,
        password:password
    }
    console.log(newUser);
    MongoClient.connect(MONGO_URL_ATLAS, async (err, db) => {
        if(err) throw err;
        let dbo = db.db('dbServer')
        let coleccion=dbo.collection('administradores');
        try {
           
            const usuario = await coleccion.findOne({ email:email});

            console.log('esto es usuario|: ',usuario.password);
           
            if (usuario) {
               
                if(usuario.password==password){
                    res.redirect('/usuario.html');
                }else{

                    res.json({message:'contraseña incorrecta'})
                }
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al buscar el usuario');
        }
    })
    res.send(newUser);
})

mongoose.connect(MONGO_URL_ATLAS , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const adminRouter = require('./router/adminRouter');
const usuarioRouter = require('./router/usuarioRouter');
const productoRouter = require('./router/productoRouter');


app.use('/admin', adminRouter);
app.use('/usuario', usuarioRouter);
app.use('/producto', productoRouter);


app.listen(port, () => {
    console.log(`escuchando en el puerto http://localhost:${port}`);
})
