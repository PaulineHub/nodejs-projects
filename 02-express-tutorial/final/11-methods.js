const express = require('express');
const app = express();
let {people} = require('./data')

//app.use([path,] callback [, callback...])
//Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

//STATIC ASSETS
app.use(express.static('./methods-public'))

//PARSE FORM DATA

//express.urlencoded([options])
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. 
app.use(express.urlencoded({extended: false}))

//PARSE JSON
app.use(express.json())

//res.json([body])
//Sends a JSON response. The parameter can be any JSON type, including object, array, string, Boolean, number, or null,

app.get('/api/people', (req,res)=>{
    res.status(200).json({success:true,data:people})
})


app.post('/api/people', (req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success: true,person: name})
})


//[...] spread in array
//can be use instead of push(),splice(), concat()
app.post('/api/postman/people', (req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'})
    }
    res.status(201).json({success: true,data: [...people, name]})
})

//req.body
//Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().

app.post('/login',(req,res)=>{
    const {name} = req.body;
    if(name){
        return res.status(200).send(`welcome ${name}`)
    } else {
        res.status(401).send('Please enter your name')
    }

})

app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const person = people.find((person)=> person.id === Number(id));

    if(!person){
        return res.status(404).json({success:false,msg:`no person with id ${id}`})
    }

    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name
        }
        return person
        
    })
    res.status(200).json({success:true, data: newPeople})
})

app.delete('/api/people/:id',(req,res)=>{
    const person = people.find((person)=> person.id === Number(req.params.id));

    if(!person){
        return res.status(404).json({success:false,msg:`no person with id ${req.params.id}`})
    }
    const newPeople = people.filter((person)=> person.id !== Number(req.params.id));
    return res.status(200).json({success:true,data: newPeople})
})


app.listen(5000, ()=>{
    console.log('Server is listening port 5000');
})