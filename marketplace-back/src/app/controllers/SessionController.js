const User = require("../models/User");

class SessionController {
  //Cadastro de seção
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //Se user não for encontrado- email
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    //Se senha inválida
    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.json({ user, token: User.generateToken(user) }); //gerar token do usuário
  }
}

module.exports = new SessionController();
