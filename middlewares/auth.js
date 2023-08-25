const jwt = require("jsonwebtoken");

module.exports = async (request, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    return res.status(400).json({ data: {}, success: false, message: "Authentication Error", errors: new Error("Invalid request!") });
  }
};