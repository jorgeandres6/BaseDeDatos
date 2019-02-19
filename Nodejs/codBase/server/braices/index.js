var express = require ('express'),
    router = express.Router(),
    path = require ('path'),
    bdd = require ('../mongoose/index.js');

    /*bdd.autentificacion("UsuarioBeta","1234abc.").then((result) => {
        console.log("Final "+result);
    });*/

router.get('/',function(req,res){
  res.sendFile('index.html',{root:'../client'});
});

router.post('/schedule/login',function(req,res){
  var user=req.body.user,
  psw=req.body.pass;
  bdd.autentificacion(user,psw).then((result) => {
      res.send(result);
  });
});

router.post('/events/new',function(req,res){
  let usuario=req.body.usuario,
      titulo=req.body.title,
      fInicio=req.body.start,
      fFin=req.body.end;
  bdd.guardarEvento (usuario, titulo, fInicio, fFin);
  res.send("Evento "+titulo+", almacenado exitosamente!");
});

router.post('/schedule/newuser',function(req,res){
  let nombre=req.body.user_names,
      psw=req.body.user_pword,
      fNac=req.body.user_dbirt,
      correo=req.body.user_email;
  bdd.nuevoUsuario(nombre, psw, fNac, correo);
  res.send("Usuario ingresado exitosamente");
});

router.post('/events/all',function(req,res){
  let nombre=req.body.nombre;
  bdd.poblarCalendario(nombre).then((result) => {
    res.send(result);
  });
});

router.post('/events/delete',function(req,res){
  let id=req.body._id,
      resultado=bdd.eliminarEvento(id);
  res.send(resultado);
});

router.post('/events/update',function(req,res){
  let id=req.body._id,
      newStart=req.body.newStart,
      newEnd=req.body.newEnd;
  bdd.actualizarEvento (id,newStart,newEnd);
});

module.exports = router;
