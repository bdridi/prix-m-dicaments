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
    
    
        // SEND MAIL CONTACT ----------------------

    app.post('/api/contact', function(req, res){
        
      var mailOpts, transporter;    
        
       console.log("contact api on server invoked");
       
       var nodemailer = require('nodemailer');
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'billy.dridi@gmail.com',    // your email here
            pass: 'roktud52'          // your password here
          }
        });
    
        var htmlContent = '<p>Name: ' + req.body.name + '</p>' +
                        '<p>Email: ' + req.body.email + '</p>' +
                        '<p>Message: ' + req.body.message + '</p>';
         var mailOptions = {
        to: 'billy.dridi@gmail.com',                  // your email here
        subject: 'New message',
        from: req.body.name + ' <' + req.body.email + '>',
        sender: req.body.email,
        html: htmlContent
      };
      
      
      transporter.sendMail(mailOptions, function(err, info){
        if (err) {
          console.log(err);
          console.log("error occured");
        }else{
          console.log('Message sent: ' + info.response);
          return res.json(201, info);
        }
      });
   

        
    });
    
        

    // application -------------------------------------------------------------
     app.get('*', function(req, res) {
        
     res.sendfile(path.join(__dirname, '../public/index0.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080"); 
    
    