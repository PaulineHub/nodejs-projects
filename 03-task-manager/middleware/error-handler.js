const errorHandlerMiddleware = (err,req,res,next) => {
    console.log(err);
    return res.status(err.status).json({msg:err.message})
}

module.exports = errorHandlerMiddleware