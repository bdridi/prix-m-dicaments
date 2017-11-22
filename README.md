# Application web des prix des prix des médicaments en france Edit

## Node-Express-AngularJS-MongoDB-Bootstrap 

### Requirements : 
     `npm install mongodb`
     `npm install nodemon`

### start mongo
    `sudo /etc/init.d/mongodb start`
    `mongo`


### Starting node server with nodemon 


    `sudo nodemon node.js/server.js`

### import JSON Data to mongo database collection :

    `mongoimport --db drugs --collection medicaments --file /home/ubuntu/workspace/data/data.json`

    if we get this error : 
    exception:BSON representation of supplied JSON is too large: code FailedToParse: FailedToParse: Expecting '{': offset:0
    we use the following command:
    mongoimport -d drugs -c medocs --file /home/ubuntu/workspace/data/medocs.json --jsonArray


