const Ad = require("../models/Ad");

class AdController {
  //Representa 
  async index(req, res) {
    const filters = {};
    // filters
    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }
    //O populate está relacionado com a chave estrangeira- Autor que escreveu o anúncio
    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ["author"],
      sort: "-createdAt"
    });

    return res.json(ads);
  }
  //Aparecer
  async show(req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }
  //Criar anuncio
  async store(req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId });

    return res.json(ad);
  }
  //Para atualizar pelo id
  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(ad);
  }
  //Para deletar pelo id
  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdController(); //exportando
