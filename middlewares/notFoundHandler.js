const notFoundHandler = (req, res, next) => {
    return res.status(404).json({data:[],success:false,message:"URL not found."})
}

module.exports = notFoundHandler