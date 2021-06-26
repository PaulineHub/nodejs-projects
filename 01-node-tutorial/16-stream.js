//Class: fs.ReadStream
//Instances of <fs.ReadStream> are created and returned using the fs.createReadStream() function.
//fs.createReadStream(path[, options])
//<fs.ReadStream> s'etend a Class: stream.Readable, Event: 'data'

const {createReadStream} = require('fs');

const stream = createReadStream('./content/big.txt', {highWaterMark:90000, encoding: 'utf8'});

//default 64kb
// hitghWaterMark - control size
//const stream = createReadStream('./content/big.txt', {highWaterMark:90000});
//const stream = createReadStream('./content/big.txt', {encoding: 'utf8'});

stream.on('data', (result)=>{
    console.log(result)
})

stream.on('error', (err)=>{
    console.log(err)
})