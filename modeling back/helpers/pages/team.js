const fs = require('fs');
const { Page, Team } = require('../../mongoose/Schemas');

module.exports.set = async (req, res) => {
  const page = await Page.find({ type: 'team' });
  const { title, desc } = req.body;
  const bg =
    appRoot + '\\' + req.file ? req.file.path : '/static/placeholder.jpg';
  if (!page) {
    const page = new Page({
      title: title,
      desc: desc,
      bg: bg,
      type: 'team'
    });
    page.save(err => {
      if (!err) res.status(200).send(page);
      else res.status(400).send(err);
    });
  } else {
    if (title) page.title = title;
    if (desc) page.desc = desc;
    if (req.file) {
      fs.unlink(page.bg, err => {
        if (err) console.log(err);
      });
      page.bg = bg;
    }
    page.save(err => {
      if (!err) res.status(200).send(page);
      else res.status(400).send(err);
    });
  }
};

module.exports.get = async (req, res) => {
  const page = await Page.findOne({ type: 'team' });
  const page = await Page.findOne({ type: 'services' });
  if (!page) {
    return res.status(404).send({ message: 'Page not found !' });
  }
  return res.status(200).send(page);
};
module.exports.add = async (req, res) => {
  const { title, desc } = req.body;
  const img =
    appRoot + '\\' + req.file ? req.file.path : '/static/placeholder.jpg';
  const page = await Page.findOne({ type: 'team' });
  if (!page)
    return res.status(404).send({ message: 'Create Team page first !' });
  const team = new Team({
    title: title,
    desc: desc,
    img: img
  });
  page.content.push(team);
  page.save(err => {
    if (!err) res.status(200).send(page);
    else {
      res.status(500).send({ message: 'Somthing goes wrong !' });
    }
  });
};

module.exports.remove = async (req, res) => {
  const _id = req.body._id;
  const tempPage = await Page.findOne({ type: 'team' });
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
    { type: 'team' },
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
    const page = await Page.findOne({ type: 'team' });
    res.status(200).send(page);
  } else {
    res.status(500).send({ message: 'Somthing goes wrong !' });
  }
};

module.exports.editService = async (req, res) => {
  const { title, desc, _id } = req.body;
  const obj = {};
  if (title) obj['content.$.title'] = title;
  if (desc) obj['content.$.desc'] = desc;
  if (req.file) {
    const img =
      appRoot + '\\' + req.file ? req.file.path : '/uploads/placeholder.jpg';
    const page = await Page.findOne({
      type: 'team',
      'content._id': mongoose.Types.ObjectId(_id)
    });
    for (let i = 0; i < page.content.length; i++) {
      const element = page.content[i];
      if (element._id.toString() === _id) {
        fs.unlink(element.img, err => {
          if (err) console.log(err);
        });
        break;
      }
    }
    obj['content.$.img'] = img;
  }
  const page = await Page.updateOne(
    { type: 'services', 'content._id': mongoose.Types.ObjectId(_id) },
    { $set: obj }
  );
  if (page.ok === 1) {
    const page = await Page.findOne({ type: 'team' });
    res.status(200).send(page);
  } else {
    res.status(500).send({ message: 'There is a problem !' });
  }
};
