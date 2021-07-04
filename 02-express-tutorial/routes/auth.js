const express = require('express');
const router = express.Router();


router.post('/',(req,res)=>{
    const {name} = req.body;
    if(name){
        return res.status(200).send(`welcome ${name}`)
    } else {
        res.status(401).send('Please enter your name')
    }

})

module.exports = router