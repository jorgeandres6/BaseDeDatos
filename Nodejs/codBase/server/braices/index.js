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

router.post('/login',function(req,res){
  var user=req.body.user,
  psw=req.body.pass;
  bdd.autentificacion(user,psw).then((result) => {
      res.send(result);
  });
});


module.exports = router
