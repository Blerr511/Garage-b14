const fs = require('fs');
const Page = require('../../mongoose/Schemas').Page;
module.exports.set = async (req, res) => {
  const page = await Page.findOne({ type: 'aboutus' });
  const { title, desc } = req.body;
  const path =
    appRoot + '\\' + req.file ? req.file.path : '/uploads/placeholder.jpg';
  if (!page) {
    const page = new Page({
      title: title,
      desc: desc,
      type: 'aboutus',
      bg: path
    });
    page.save(err => {
      if (!err) res.send(page);
      else console.error(err);
    });
  } else {
    fs.unlink(page.bg, err => {
      if (err) console.error(err);
    });
    page.title = title;
    page.bg = path;
    page.desc = desc;
    page.__v = ++page.__v;
    page.save(err => {
      if (!err) res.status(200).send(page);
      else res.status(500).send(err);
    });
  }
};

module.exports.get = async (req, res) => {
  const page = await Page.findOne({ type: 'aboutus' });
  if (page) res.status(200).send(page);
  else res.status(404).send({ message: 'Page data not found!' });
};
