// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var path = require('path');


    // configuration =================

    mongoose.connect('mongodb://localhost:27017/drugs');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    
    
    // define model =================
    var MedocsSchema = new mongoose.Schema({ 
         name: String, 
         price: Number
      });
      
    MedocsSchema.statics.findByName = function(name, cb){
        return this.find({ name: new RegExp(name, 'i') }, cb);
    }

      
    var medoc = mongoose.model('Medoc', MedocsSchema);
    
    // defining static method findByName
   

  
    
    
    
    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all drugs
    app.get('/api/drugs', function(req, res) {

        // use mongoose to get all drugs in the database
        medoc.find(function(err, drugs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(drugs); // return all drugs in JSON format
        });
    });

    // create todo and send back all drugs after creation
    app.post('/api/drugs', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        medoc.create({
            text : req.body.text,
            done : false
        }, function(err, drug) {
            if (err)
                res.send(err);

            // get and return all the drugs after you create another
            medoc.find(function(err, drugs) {
                if (err)
                    res.send(err)
                res.json(drugs);
            });
        });

    });
    
    
    // Search drugs
    app.get('/api/selected/:drug_name', function(req, res) {
         // name : req.params.drug_name;
        // console.log(drug_name);
        medoc.findByName(req.params.drug_name, function (err, drugs) {
        console.log(drugs);
        res.json(drugs);
    });
    
    });
    
     // Search drug by id
    app.get('/api/drug/:drug_id', function(req, res) {
          //_id : req.params.drug_id
          //console.log(_id);
          //console.log(req.params.drug_id);
        // console.log(drug_name);
        medoc.findOne({_id: req.params.drug_id}, function (err, drug) {
        console.log(drug);
        res.json(drug);
    });
    
    });


    
    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        
      res.sendfile(path.resolve('../public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
      console.log(path.resolve('../public/index.html'));
        
    });
    
    
    
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080"); 
    
    