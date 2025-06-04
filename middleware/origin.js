const verifyOrigin = (req, res, next) => {
  const allowedOrigins = ["http://localhost:5173"];
  const origin = req.get("origin");
  if (allowedOrigins.includes(origin)) {
    return next();
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = verifyOrigin;