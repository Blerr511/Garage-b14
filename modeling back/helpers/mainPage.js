const MainItem = require('../mongoose/Schemas').MainItem;
const rmf = require('./mFs').rmf;
const mongoose = require('mongoose');
module.exports.get = async (req, res) => {
  const mainItem = await MainItem.find({});
  res
    .status(200)
    .send({ code: 200, message: 'Ok', data: mainItem ? mainItem : [] });
};

module.exports.add = async (req, res) => {
  const desc = req.body.desc;
  try {
    const objId = new mongoose.Types.ObjectId();
    const mainItem = new MainItem({
      desc: desc,
      _id: objId,
      route: objId
    });
    let bgExists = false;
    if (req.files.length > 0) {
      req.files.map(el => {
        if (el.fieldname === 'logo') {
          mainItem.logo = (appRoot + '\\' + el.path).replace(/\\/g, '/');
        } else if (el.fieldname === 'bg') {
          mainItem.bg = (appRoot + '\\' + el.path).replace(/\\/g, '/');
          mainItem.bgType = el.mimetype.split('/')[0];
          bgExists = true;
        }
      });
    } else {
      res
        .status(400)
        .send({ code: 400, message: 'Background image required !' });
      return false;
    }
    if (!bgExists) {
      res
        .status(400)
        .send({ code: 400, message: 'Background image required !' });
      return false;
    }
    mainItem.save(err => {
      if (err) {
        if (mainItem.logo) rmf(mainItem.logo);
        rmf(mainItem.bg);
        throw err;
      } else {
        res.status(200).send({ code: 200, message: 'New Item saved' });
      }
    });
  } catch (err) {
    res.status(500).send({ code: 400, message: 'Something goes wrong' });
    console.error(err);
  }
};

module.exports.edit = async (req, res) => {
  const { desc, _id } = req.body;

  const mainItem = await MainItem.findOne({ _id: _id });
  mainItem.desc = desc;
  desc.save(err => {
    res
      .status(err ? 400 : 200)
      .send(
        err
          ? { code: 400, message: 'Something goes wrong' }
          : { code: 200, message: 'Changes saved' }
      );
  });
};

module.exports.remove = async (req, res) => {
  const _id = req.body._id;
  if (!_id) {
    res.status(400).send({ code: 400, message: 'Page not found' });
    return false;
  }
  const mainItem = await MainItem.findOne({ _id: _id });
  if (mainItem.logo) rmf(mainItem.logo);
  rmf(mainItem.bg);
  const result = await MainItem.deleteOne({ _id: _id });
  res
    .status(result.deletedCount === 0 ? 400 : 200)
    .send(
      result.deletedCount === 0
        ? { code: 400, message: 'Something goes wrong' }
        : { code: 200, message: 'Changes saved' }
    );
};
