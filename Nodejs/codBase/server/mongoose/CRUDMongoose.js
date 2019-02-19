async function autentificacion (mod,nom,psw) {
    let mensaje = await comprobacion(mod,nom,psw);
    //console.log("adentro2");
    //console.log("mensaje "+mensaje);
    return (mensaje);
  };

async function comprobacion (mod,nom,psw){
  let mensaje="";
  await mod.countDocuments({$and:[{correo:nom},{password:psw}]},(e,c) => {
    if(e) {
      console.log("Hola Error "+e);
    };
    console.log("Este es el resultado "+c);
    mensaje = (c>0) ? "ok" : "No validado";
    //mensaje = "Validado";
  });
  return mensaje;
};

function guardarEvento (mod, usuario, titulo, fInicio, fFin){
  let nuevo = new mod({nombre:usuario,title:titulo,start:fInicio,end:fFin});
  nuevo.save((e) => {
    if(e) return console.log(e);
  });
};

function nuevoUsuario (mod, nombre, password, fNacimiento, correo){
  let nuevo = new mod({nombre:nombre,password:password,fNacimiento:fNacimiento,correo:correo});
  nuevo.save((e) => {
    if(e) return console.log(e);
  });
};

async function poblarCalendario (mod, nombre){
  let resultado;
  await mod.find({nombre:nombre},(e,data)=>{
    if (e) {console.log(e)};
    resultado = data;
  });
  return (resultado);
};

function eliminarEvento (mod,id){
  mod.deleteOne({_id:id},(e)=>{
    if (e) console.log(e);
  });
  return ("Evento eliminado exitosamente!");
}

function actualizarEvento (mod,id,newStart,newEnd){
  console.log("i--------------------"+id);
  console.log("s--------------------"+newStart);
  console.log("e--------------------"+newEnd);
  mod.findByIdAndUpdate(id,{start:newStart,end:newEnd},(e,d)=>{
    console.log(d);
  });
  //mod.updateOne({_id:id});
}

module.exports = {autentificacion, guardarEvento, nuevoUsuario, poblarCalendario, eliminarEvento, actualizarEvento};
