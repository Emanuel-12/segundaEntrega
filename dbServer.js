
const dotenv = require('dotenv')
dotenv.config();

const MongoClient = require('mongodb').MongoClient;


const MONGO_URL_LOCAL = process.env.MONGO_LOCAL;

const MONGO_URL_ATLAS = process.env.MONGO_ATLAS;



MongoClient.connect(MONGO_URL_ATLAS, async (err, db) => {

    if(err) throw err;

    let dbo = db.db('dbServer')

    let coleccion1 = 'productos';
    let coleccion2 = 'usuarios';
    let coleccion3 = 'administradores';
   
    await console.log(`Base de datos conectada a ${dbo}`);

 let coleccion="creamos la colección";
    dbo.createCollection(coleccion, (err, colection) => {
    if(err) throw err;
    console.log(`Colección ${coleccion} creada en la Base de datos: ${dbo}`);
    db.close();
});
});