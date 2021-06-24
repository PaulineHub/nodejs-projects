//path : The path module provides utilities for working with file and directory paths.It can be accessed using:
const path = require('path');
console.log(path.sep) 
//returns /

//The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log(filePath);
//returns /content/subfolder/test.txt

//The path.basename() method returns the last portion of a path, 
const base = path.basename(filePath)
console.log(base);
//returns test.txt

//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); 
//returns /home/pauline/projets/node/tutorial/content/subfolder/test.txt

