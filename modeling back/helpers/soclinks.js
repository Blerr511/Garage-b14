const Soclink = require('../mongoose/Schemas').Soclink;

module.exports.get = async (req, res) => {
  const soclinks = await Soclink.find({});
  res
    .status(200)
    .send({ code: 200, message: 'OK', data: soclinks ? soclinks : [] });
};

module.exports.add = (req, res) => {
  const { name, url } = req.body;

  if (!(name && url)) {
    res.status(400).send({ code: 400, message: 'Name and Link required !' });
    return false;
  }

  const soclink = new Soclink({
    name: name,
    url: url
  });
  soclink.save(err => {
    if (err) {
      res.status(500).send({ code: 500, message: 'Somthing goes wrong ' });
      return false;
    } else {
      res.status(200).send({ code: 200, message: 'New link saved !' });
    }
  });
};

module.exports.remove = async (req, res) => {
  const _id = req.body._id;

  if (!_id) {
    res.status(400).send({ code: 400, message: 'Item not found !' });
    return false;
  }
  await Soclink.deleteOne({ _id: _id }, err => {
    if (!err) res.status(200).send({ code: 200, message: 'Changes saved  ' });
    else res.status(400).send({ code: 400, message: 'Something goes wrong' });
  });

  res.status(200).send({ code: 200, message: 'Item removed ' });
};

module.exports.edit = async (req, res) => {
  const { _id, name, url } = req.body;
  if (!(_id && name && url)) {
    res.status(400).send({ code: 400, message: 'Item not found !' });
    return false;
  }
  const resault = await Soclink.updateOne(
    { _id: _id },
    { $set: { name: name, url: url } },
    err => {
      if (!err) res.status(200).send({ code: 200, message: 'Changes saved  ' });
      else res.status(400).send({ code: 400, message: 'Something goes wrong' });
    }
  );

  console.log(resault);
};
