const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
      try {
                  
                  let token = req.header('x-token');
                  if(!token){
                    return res.json("Token not found");
                  }
                  let decode = jwt.verify(token,'jwtsecreat');
                  req.user = decode.user;
                  next();
      } catch (error) {
        console.log(error);
      }
}