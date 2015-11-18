
    ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Hi there! Welcome to Cloud9!

To get you started, we have created a few example applications.

1) Choose the application that you want to run by selecting a language folder

2) Open the file within the folder

3) Follow the run instructions in the file's comments
    
And that's all there is to it! Just have fun. Go ahead and edit the code, 
or add new files. It's all up to you! 

Happy coding!
The Cloud9 team

P.S. Oh, one more thing: to start a new project, hop on over to your 
dashboard (from your profile picture at the top right choose "Dashboard") 
and hit the button labelled "Create New Workspace."


## Support & Documentation

Visit http://docs.c9.io for support, or to learn more about using Cloud9. 
To watch some training videos, visit http://www.youtube.com/user/c9ide

## About this demo

We provide this demo workspace in order for you to experience the power of Cloud9. 
It contains sample projects for Node.js, PHP, Python, Ruby, and HTML5.


sudo /etc/init.d/mongodb start
mongo

npm install mongodb
npm install nodemon

killall node : to stop the node server


https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular

mongoimport --db drugs --collection medicaments --file /home/ubuntu/workspace/data/data.json

if we get this error : 
exception:BSON representation of supplied JSON is too large: code FailedToParse: FailedToParse: Expecting '{': offset:0
we use the following command:
mongoimport -d drugs -c medocs --file /home/ubuntu/workspace/data/medocs.json --jsonArray


mysql import data from sql file :
use medoc
source /home/ubuntu/workspace/data/tables.json

installing phpmyadmin
phpmyadmin-ctl install


import csv to mysql :

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
SET CHARACTER SET 'utf8';
SET collation_connection = 'utf8_general_ci';
---------------
select distinct 
d.cis,d.libelle,d.forme,d.etat,d.titulaire,p.libelle_pres,p.taux_rem,p.prix
from medoc_desc d, medoc_pres p
where d.cis = p.cis
and p.prix is not null;