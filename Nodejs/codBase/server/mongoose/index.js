var MongoClient = require('mongoDB').MongoClient,
    url = "mongoDB://localhost/calendario",
    mongoose = require ('mongoose'),
    esquema = mongoose.Schema({nombre:String,password:String,fNacimiento:String,correo:String}),
    eventos = mongoose.Schema({nombre:String,title:String,start:String,end:String}),
    modelo = mongoose.model('usuarios',esquema),
    mEventos = mongoose.model('eventos',eventos),
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

  function guardarEvento (usuario, titulo, fInicio, fFin) {
      mongoose.connect(url);
      operaciones.guardarEvento(mEventos, usuario, titulo, fInicio, fFin);
  };

  function nuevoUsuario (nombre, password, fNacimiento, correo) {
      mongoose.connect(url);
      operaciones.nuevoUsuario(modelo, nombre, password, fNacimiento, correo);
  };

  async function poblarCalendario (nombre){
    let resultado="";
    mongoose.connect(url);
    await operaciones.poblarCalendario(mEventos,nombre)
    .then((result)=> {
      resultado = result;
    });
    return resultado;
  };

module.exports = {autentificacion, guardarEvento, nuevoUsuario, poblarCalendario};
