// reference the http module so we can create a webserver
var http = require("http");
var mongodb = require('mongodb');
var url = require('url');
var querystring = require('querystring');


// create a server
http.createServer(function(req, res) {
    // on every request, we'll output 'Hello world'
    var page = url.parse(req.url).pathname;
        res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/') {
        res.write(' Application home page');
        
    }
    else if (page == '/medocs') {
        res.write('Welcome to page 1 !');
    // get all drugs
    }
    else if (page == '/drug') {
        var params = querystring.parse(url.parse(req.url).query);
         if ('code' in params ) {
        res.write('Code Medicament est : ' + params['code']);
        // peforming select query
        }
        else {
        res.write('Vous devez chercher un médicament ! non ?');
        } 
    
    } 
    res.end();
   
   
   
   
}).listen(8080);

connectMongo();

// Note: when spawning a server on Cloud9 IDE, 
// listen on the process.env.PORT and process.env.IP environment variables

// Click the 'Run' button at the top to start your server,
// then click the URL that is emitted to the Output tab of the console



function connectMongo(){
    MongoClient = mongodb.MongoClient;
    urlMongo = 'mongodb://localhost:27017/drugs';
    MongoClient.connect(urlMongo,function(err,db){
        
        if (err) {
            console.log("Unable to connect to Database ", err);
        }
        else{
            console.log("Connection etablished to :", urlMongo);
            
        }
    });
}

