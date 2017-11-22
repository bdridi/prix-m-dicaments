




sudo /etc/init.d/mongodb start
mongo

npm install mongodb
npm install nodemon
********************************************
# Starting node server with nodemon 
********************************************

sudo nodemon node.js/server.js
- Gére les changements du serveur nodejs ( redmemarre le serveur à chaque modification )

killall node : to stop the node server


https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
**********************************************
#import JSON Data to mongo database collection :
**********************************************
mongoimport --db drugs --collection medicaments --file /home/ubuntu/workspace/data/data.json

if we get this error : 
exception:BSON representation of supplied JSON is too large: code FailedToParse: FailedToParse: Expecting '{': offset:0
we use the following command:
mongoimport -d drugs -c medocs --file /home/ubuntu/workspace/data/medocs.json --jsonArray

*************************************
# mysql import data from sql file :
*************************************

use medoc
source /home/ubuntu/workspace/data/tables.json

**************************
# import csv to mysql :
**************************
LOAD DATA INFILE "/home/ubuntu/workspace/data/pres_data.csv"
INTO TABLE medoc_pres
CHARACTER SET UTF8
COLUMNS TERMINATED BY '\t'
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 LINES
------------------------
LOAD DATA INFILE "/home/ubuntu/workspace/data/pres_data.csv"
INTO TABLE medoc_pres
CHARACTER SET UTF8
COLUMNS TERMINATED BY '\t'
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 LINES
----------------

**************************
Requete de sélection des médicaments
**************************
---------------
select distinct 
d.cis,d.libelle,d.forme,d.etat,d.titulaire,p.libelle_pres,p.taux_rem,p.prix
from medoc_desc d, medoc_pres p
where d.cis = p.cis
and p.prix <> '';


*******************
#phpmyadmin    :
*******************
*  sudo mysql-ctl start
*  sudo phpmyadmin-ctl install
