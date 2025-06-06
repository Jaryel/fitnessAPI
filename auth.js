const jwt = require('jsonwebtoken');

function verify(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

function verifyUser(req, res, next) {
  verify(req, res, () => {
    if (req.user) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  });
}

module.exports = { verify, verifyUser };
