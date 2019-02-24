//Ingereso de 1 usuario a traves de la ejecucion de este script en consola

module.exports.ingresarUno = (db,callback) => {
  let coleccion = db.collection("usuarios");

  coleccion.insertOne({
    nombre: "UsuarioBeta",
    correo: "usuario@beta.com",
    fNacimiento: "1991-03-21",
    password : "1234abc."
  }, (e,res) => {
    if(e) console.log(e);
    console.log("Resultado "+res);
  });
  db.close();
}
