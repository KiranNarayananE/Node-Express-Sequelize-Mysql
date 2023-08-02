const jwt = require("jsonwebtoken");

 const generateToken = (userId,role) => {
  const token = jwt.sign({ id: userId,role:role },"secret");
  return token;
};

 const verifyToken = async (req, res, next) => {
  try {
  
    let token = req.headers["authorization"];
   
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    if(verified.role=="user"){
    next();
    }
    else{
      return res.status(403).send("Access Denied"); 
    }

    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
    generateToken,
    verifyToken,
  };
  