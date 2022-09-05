//fs : The fs (file system) module enables interacting with the file system in a way modeled on standard POSIX functions.It can be accessed using:
const {readFileSync, writeFileSync } = require('fs');
// Same as :
// const fs = require('fs);
// fs.readFileSync()
console.log('start');

//fs.readFileSync(path[,options]) : returns the content of the path
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');
// console.log(first, second);//return Hello, this is first text file ! Hello, this is second text file !

//fs.writeFileSync(file, data[, options]): When file is a filename, asynchronously writes data to the file, replacing the file if it already exists. 
writeFileSync('./content/result-sync.txt', `Here is the result : ${first}, ${second}`, {flag: 'a'}) //commande node app.js : cree fichier result-sync.txt ds folder content et insere la phrase. L'objet option flag fait reecrire une 2eme foi la reponse.

console.log('done with this task');
console.log('starting next one');