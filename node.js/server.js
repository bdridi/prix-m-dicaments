// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var path = require('path');


    // configuration ==========================================================================================================================

    mongoose.connect('mongodb://localhost:27017/drugs');     // connect to mongoDB database on modulus.io

    //app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
   
    app.use('/img',express.static(path.join(__dirname, '../public/images')));   // set the static files location for images
    app.use('/js',express.static(path.join(__dirname, '../public/js')));        // set the static files location for javascript files
    app.use('/css',express.static(path.join(__dirname, '../public/css')));      // set the static files location for styles
    app.use('/partials',express.static(path.join(__dirname, '../public/partials')));      // set the static files location for styles

    
    
    // -------------- test new schema ------
    var MedocSchema = new mongoose.Schema({ 
         cis : String,
         libelle: {type:String,index:true}, 
         forme:String,
         etat : String,
         titulaire : String,
         libelle_pres : String,
         taux_rem : String,
         prix: String
      });
      
       MedocSchema.statics.findByName = function(name, cb){
        return this.find({ libelle: new RegExp(name, 'gi') }, cb);
     }
     
     var medicament = mongoose.model('medocs', MedocSchema);
    
    // ---------------- end test new schema --------
    
    // define Schema and model =============================================================================================================================

   /* var MedicamentSchema = new mongoose.Schema({ 
         libelle: {type:String,index:true}, 
         prix: String
      });
      
      MedicamentSchema.statics.findByName = function(name, cb){
        return this.find({ libelle: new RegExp(name, 'gi') }, cb);
    }
    
     var medicament = mongoose.model('Medicament', MedicamentSchema);
   */

    // routes ======================================================================
    // api ------------------------------------------------------------------------
    
    // Search drugs
    app.get('/api/selected/:drug_name', function(req, res) {
        
        medicament.findByName(req.params.drug_name, function (err, drugs) {
        res.json(drugs);
    });
    
    });
    
     // Search drug by id
    app.get('/api/drug/:drug_id', function(req, res) {
        medicament.findOne({_id: req.params.drug_id}, function (err, drug) {
        res.json(drug);
        });
    
    });

    // application -------------------------------------------------------------
     app.get('*', function(req, res) {
        
     res.sendfile(path.join(__dirname, '../public/index0.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    
    
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8090"); 
    
    