//Ingreso de un usuario nuevo

let MongoClient = require('mongoDB').MongoClient,
    url = "mongoDB://localhost/calendario",
    operaciones = require ('./CRUD.js');

    MongoClient.connect(url,(e, db) => {
      if(e) console.log(e);
      console.log("Conexion establecida con la base de datos");
      operaciones.ingresarUno(db,(e,res) => {
        if(e) console.log("error "+e);
      });
    });
