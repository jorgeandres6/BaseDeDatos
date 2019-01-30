module.exports.ingresarUno = (db,callback) => {
  let coleccion = db.collection("usuarios");

  coleccion.insertOne({
    nombre: "UsuarioBeta",
    password : "1234abc."
  }, (e,res) => {
    if(e) console.log(e);
    console.log("Resultado "+res);
  });
  db.close();
}
