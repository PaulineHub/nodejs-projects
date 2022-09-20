const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req,res) => {
    const {username,password} = req.body

    // check for empty values
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }

    //just for demo, normally provide by DB
    const id = new Date().getDate()
    //method jwt.sign()
    // send payload (object)(DONT PUT A PASSWORD IN IT), a secret string, and options
    // try to keep payload small for better user experience
    // in production, the secret string must be long and unguessable
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res) => {
    
    console.log(req.user);

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`,secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
    

}

module.exports = {
    login,
    dashboard
}