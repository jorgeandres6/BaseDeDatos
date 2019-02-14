var MongoClient = require('mongoDB').MongoClient,
    url = "mongoDB://localhost/calendario",
    mongoose = require ('mongoose'),
    esquema = mongoose.Schema({nombre:String,password:String,
                              eventos:[{nombre:String,fechaInicio:Date,fechaFin:Date,horaInicio:Number, horaFin:Number}]}),
    modelo = mongoose.model('usuarios',esquema),
    operaciones = require("./CRUDMongoose.js");

async function autentificacion (user, psw) {
    let resultado="";
    mongoose.connect(url);

    await operaciones.autentificacion(modelo,user,psw).then((result)=> {
      resultado = result;
      //console.log("resultado "+resultado);
    });
    return resultado;
  };

module.exports = {autentificacion};
