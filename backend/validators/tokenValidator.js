const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = "";
    res.json({ error: "Invalid token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else if (req.user.role === 0) {
    res.json({ error: "You are not allowed to make requests here" });
  } else {
    res.json({ error: "Unidentified request" });
  }
};
