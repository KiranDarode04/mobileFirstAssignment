const jwt = require("jsonwebtoken");
const secretKey =
  "c9499f8d393a43ee5c24e2c04409310bcffdc909191d52ce02cb5aba01a532a4";

const validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.expiredAt)
        return res.status(402).json({ err: "token expired admin" });
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    const { Role, UserName } = decoded;
    if (Role === "Admin" || Role ==="Guest") {
      req.user = {
        id: decoded.id,
        UserName: decoded.UserName,
        Role: decoded.Role,
      };

      next();
    } else {
      return res.status(401).json({
        code: "UNAUTHORISED_USER",
        message: "Admin not found",
      });
    }
  });
};


const checkTokenExpirationGuest = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.expiredAt)
          return res.status(402).json({ err: "token expired admin" });
        return res.status(401).json({ error: "Failed to authenticate token" });
      }
      const { Role, UserName } = decoded;
      if (Role === "Guest") {
        req.user = {
          id: decoded.id,
          UserName: decoded.UserName,
          Role: decoded.Role,
        };
        next();
      } else {
        return res.status(401).json({
          code: "UNAUTHORISED_USER",
          message: "Guset not found",
        });
      }
    });
  };
  const checkTokenExpirationAdmin = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        if (err.expiredAt)
          return res.status(402).json({ err: "token expired admin" });
        return res.status(401).json({ error: "Failed to authenticate token" });
      }
      const { Role, UserName } = decoded;
      if (Role === "Admin") {
        req.user = {
          id: decoded.id,
          UserName: decoded.UserName,
          Role: decoded.Role,
        };
        next();
      } else {
        return res.status(401).json({
          code: "UNAUTHORISED_USER",
          message: "You are not admin",
        });
      }
    });
  };
  
module.exports = {
  validateToken,checkTokenExpirationGuest,
  checkTokenExpirationAdmin

};
