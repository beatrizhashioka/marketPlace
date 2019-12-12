const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { promisify } = require("util");
//Para autenticação
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //Se token não fornecido
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); //o secret está na pasta config
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" }); //se token inválido
  }
};
