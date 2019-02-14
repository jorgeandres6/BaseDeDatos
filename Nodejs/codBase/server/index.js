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

/*app.get('/consulta',function(req,res){
  res.send('Hola')
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
  //res.send(path.join(__dirname,'storage'))
});*/

Server.listen(port, function(){
  console.log("Puerto: "+port)
});
