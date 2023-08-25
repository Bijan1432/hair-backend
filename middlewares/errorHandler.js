const errorHandler = (err, req, res, next) => {
    let status = err.statusCode || 500
    if('development' === process.env.APP_ENV)
        return res.status(status).json({data:[],success:false,message:err.message,errorStack:err.stack})
    else
        return res.status(status).json({data:[],success:false,message:"Internal server error."})
}

module.exports = errorHandler