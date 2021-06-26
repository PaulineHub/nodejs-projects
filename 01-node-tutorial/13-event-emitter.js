//All objects that emit events are instances of the EventEmitter class. 

//The eventEmitter.on() method is used to register listeners, while the eventEmitter.emit() method is used to trigger the event.

const EventEmitter = require('events');

const customEmitter = new EventEmitter();

// keep track of the order (.emit() don't go before .on())
// additional arguments possible (callback function)

customEmitter.on('response', (name, id)=>{
    console.log(`data recieved user ${name} with id ${id}`)
})

customEmitter.on('response', ()=>{
    console.log(`some logic here`)
})

customEmitter.emit('response', 'john', 34)