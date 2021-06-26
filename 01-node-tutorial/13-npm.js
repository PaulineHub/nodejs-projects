//npm - global command (node package manager), comes with node
//npm --version

//local dependency - use it only in this particular project
//npm i <packageName>

//global dependency - use it in any project
//npm install -g <packageName>

//package.json - manifest file (stores important info about project/package)
//manual approach (creat package.json in the root, create properties etc)
//npm init (step by step, press enter to skip)
//npm init -y (everything default)

const _ = require('lodash');

const items = [1, [2, [3, [4]]]];
const newItems = _.flattenDeep(items);
console.log(newItems);
console.log('hello world');

//creation repo git, pas besoin du folder node_modules (trop lourd). Cration d'un fichier .gitignore ou on identifie les fichiers a ignorer : "/node_modules".
//creation d'un repo sur git. Commandes git init, git add, git commit -m "message", et copy past les 3 commands depuis github du nouveau repo.

//installation nodemon : commande npm i nodemon -D
//lancer nodemon : npm start (en ayant change dans package.json dans "scripts": {"start": "nodemon app.js"})

//installer un package : commande npm i packageName
//desinstaller un package : commande npm uninstall packageName


//commande npx : installe ou retire localement un npm package sur projet specifique, plutot que globalement sur l'ordinateur