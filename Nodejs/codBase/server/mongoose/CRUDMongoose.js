async function autentificacion (mod,nom,psw) {
    let mensaje = await comprobacion(mod,nom,psw);
    //console.log("adentro2");
    //console.log("mensaje "+mensaje);
    return (mensaje);
  }

async function comprobacion (mod,nom,psw){
  let mensaje="";
  await mod.countDocuments({$and:[{nombre:nom},{password:psw}]},(e,c) => {
    if(e) {
      console.log("Hola Error "+e);
    };
    console.log("Este es el resultado "+c);
    mensaje = (c>0) ? "Validado" : "No validado";
    //mensaje = "Validado";
  });
  return mensaje;
};


module.exports = {autentificacion};
