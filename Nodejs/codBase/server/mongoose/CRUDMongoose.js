//Operaciones con la base de datos

async function autentificacion (mod,nom,psw) { //Verificacion para el login
    let mensaje = await comprobacion(mod,nom,psw);
    return (mensaje);
  };

async function comprobacion (mod,nom,psw){ //Verificacion de las contraseñas
  let mensaje="";
  await mod.countDocuments({$and:[{correo:nom},{password:psw}]},(e,c) => {
    if(e) {
      console.log("Hola Error "+e);
    };
    console.log("Este es el resultado "+c);
    mensaje = (c>0) ? "ok" : "No validado";
  });
  return mensaje;
};

function guardarEvento (mod, usuario, titulo, fInicio, fFin){ //Guardar un nuevo evento
  let nuevo = new mod({nombre:usuario,title:titulo,start:fInicio,end:fFin});
  nuevo.save((e) => {
    if(e) return console.log(e);
  });
};

function nuevoUsuario (mod, nombre, password, fNacimiento, correo){ //Guardar un nuevo usuario
  let nuevo = new mod({nombre:nombre,password:password,fNacimiento:fNacimiento,correo:correo});
  nuevo.save((e) => {
    if(e) return console.log(e);
  });
};

async function poblarCalendario (mod, nombre){ //Devolver todos los eventos del usuario
  let resultado;
  await mod.find({nombre:nombre},(e,data)=>{
    if (e) {console.log(e)};
    resultado = data;
  });
  return (resultado);
};

function eliminarEvento (mod,id){ //Eliminar evento
  mod.deleteOne({_id:id},(e)=>{
    if (e) console.log(e);
  });
  return ("Evento eliminado exitosamente!");
}

function actualizarEvento (mod,id,newStart,newEnd){ //Actualizar un evento
  mod.findByIdAndUpdate(id,{start:newStart,end:newEnd},(e,d)=>{
    console.log(d);
  });
}

module.exports = {autentificacion, guardarEvento, nuevoUsuario, poblarCalendario, eliminarEvento, actualizarEvento};
