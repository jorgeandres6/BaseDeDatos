//Conexion con la base de datos y ejecucion de queries

var MongoClient = require('mongoDB').MongoClient,
    url = "mongoDB://localhost/calendario",
    mongoose = require ('mongoose'),
    esquema = mongoose.Schema({nombre:String,password:String,fNacimiento:String,correo:String}),
    eventos = mongoose.Schema({nombre:String,title:String,start:String,end:String}),
    modelo = mongoose.model('usuarios',esquema),
    mEventos = mongoose.model('eventos',eventos),
    operaciones = require("./CRUDMongoose.js");

async function autentificacion (user, psw) { //Verificacion de usuarios
    let resultado="";
    mongoose.connect(url);

    await operaciones.autentificacion(modelo,user,psw).then((result)=> {
      resultado = result;
    });
    return resultado;
  };

  function guardarEvento (usuario, titulo, fInicio, fFin) { //Guardar nuevo evento
      mongoose.connect(url);
      operaciones.guardarEvento(mEventos, usuario, titulo, fInicio, fFin);
  };

  function nuevoUsuario (nombre, password, fNacimiento, correo) { //Guardar nuevo usuario
      mongoose.connect(url);
      operaciones.nuevoUsuario(modelo, nombre, password, fNacimiento, correo);
  };

  async function poblarCalendario (nombre){ //Devolver todos los eventos del usuario
    let resultado="";
    mongoose.connect(url);
    await operaciones.poblarCalendario(mEventos,nombre)
    .then((result)=> {
      resultado = result;
    });
    return resultado;
  };

  function eliminarEvento (id){ //Eliminar un evento
    let resultado=operaciones.eliminarEvento (mEventos,id);
    return (resultado);
  };

  function actualizarEvento (id,newStart,newEnd){ //Actualizar un evento
    operaciones.actualizarEvento(mEventos,id,newStart,newEnd);
  };

module.exports = {autentificacion, guardarEvento, nuevoUsuario, poblarCalendario, eliminarEvento, actualizarEvento};
