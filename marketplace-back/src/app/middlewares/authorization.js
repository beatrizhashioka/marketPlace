const User = require("../models/User");
//Para autorização
module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);
  //Se for admin
  if (user.isAdmin) {
    return next();
  }
  //Se não for
  return res.status(401).json({ error: "Unauthorized user" });
};
