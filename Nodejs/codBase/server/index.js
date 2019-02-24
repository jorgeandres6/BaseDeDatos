//Servidor WEB

var bodyParser = require ('body-parser'),
    http = require ('http'),
    express = require ('express'),
    consulta = require ('./braices/index.js');


var port = process.env.PORT || 3000,
    app = express(),
    Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(consulta);
app.use(express.static('../client'));

Server.listen(port, function(){
  console.log("Puerto: "+port)
});
