const logger = (req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);//return GET /(ou /about) 2021
    next()
}

module.exports = logger