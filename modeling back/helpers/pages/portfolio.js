const fs = require('fs');
const { Portfolio, Page } = require('../../mongoose/Schemas');

module.exports.delete = async (req, res) => {
  const _id = req.body._id;
  const tempPage = await Page.findOne({ type: 'services' });
  for (let i = 0; i < tempPage.content.length; i++) {
    const element = tempPage.content[i];
    if (element._id.toString() === _id) {
      fs.unlink(element.img, err => {
        if (err) console.log(err);
      });
      break;
    }
  }
  const page = await Page.updateOne(
    {
      type: 'services'
    },
    {
      $pull: {
        content: {
          _id: new mongoose.Types.ObjectId(_id)
        }
      }
    },
    { safe: true }
  );
  if (page.ok === 1) {
    const page = await Page.findOne({ type: 'services' });
    res.status(200).send(page);
  } else {
    res.status(500).send({ message: 'Somthing goes wrong !' });
  }
};

module.exports.add = async (req, res) => {
  const page = await Page.findOne({ type: 'portfolio' });
  if (!page)
    return res.status(404).send({ message: 'Create porftolio page first !' });
  const { title, author, tags, other } = req.body;
  const img =
    req.filappRoot + '\\' + req.file
      ? req.file.path
      : '/uploads/placeholder.jpg';

  const portfolio = new Portfolio({
    title: title,
    author: author,
    tags: tags,
    other: other,
    img: img
  });
  page.content.push(portfolio);
  page.save(err => {
    if (!err) res.status(200).send(page);
    else res.status(500).send(err);
  });
};

module.exports.set = async (req, res) => {
  const page = await Page.findOne({ type: 'portfolio' });
  const { title, desc } = req.body;
  const bg =
    appRoot + '\\' + req.file ? req.file.path : '/uploads/placeholder.jpg';

  if (!page) {
    const page = new Page({
      title: title,
      desc: desc,
      bg: bg,
      type: 'portfolio'
    });
    page.save(err => {
      if (!err) res.status(200).send(page);
      else res.status(500).send({ message: 'Somthing ges wrong !' });
    });
  } else {
    if (title) page.title = title;
    if (desc) page.desc = desc;
    if (bg) {
      if (req.file) {
        fs.unlink(page.bg, err => {
          if (err) console.log(err);
        });
      }
      page.bg = bg;
    }

    page.save(err => {
      if (!err) res.status(200).send(page);
      else res.status(500).send({ message: 'Somthing ges wrong !' });
    });
  }
};

module.exports.get = async (req, res) => {
  const page = await Page.findOne({ type: 'portfolio' });
  if (page) {
    res.status(200).send(page);
  } else {
    res.status(404).send({ message: 'Page not found !' });
  }
};
