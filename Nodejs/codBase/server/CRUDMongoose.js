module.exports = {
  autentificacion : async function (mod,nom,psw) {
    let mensaje = "";
      await mod.count({$and:[{nombre:nom},{password:psw}]}).exec((e,c) => {
        if(e) {
          console.log("Hola Error "+e);
        };
        console.log("adentro");
        mensaje =(c>0) ? "Validado" : "No validado";
        //(c>0) ? "Validado" : "No validado";
      });
    mensaje = "Validado";
    return (mensaje);
  }
};
