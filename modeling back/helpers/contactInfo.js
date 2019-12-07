const CotactInfo = require('../mongoose/Schemas').ContactInfo;

module.exports.get = async (req, res) => {
  const cotactInfo = await CotactInfo.find({});
  res
    .status(200)
    .send({ code: 200, message: 'OK', data: cotactInfo ? cotactInfo : [] });
};

module.exports.add = (req, res) => {
  const { text, address } = req.body;

  if (!(text && address)) {
    res.status(400).send({ code: 400, message: 'Text required !' });
    return false;
  }

  const cotactInfo = new CotactInfo({
    text: text,
    address: address
  });
  cotactInfo.save(err => {
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
  await CotactInfo.deleteOne({ _id: _id }, err => {
    if (!err) res.status(200).send({ code: 200, message: 'Changes saved  ' });
    else res.status(400).send({ code: 400, message: 'Something goes wrong' });
  });

  res.status(200).send({ code: 200, message: 'Item removed ' });
};

module.exports.edit = async (req, res) => {
  const { _id, text } = req.body;
  if (!(_id && text)) {
    res.status(400).send({ code: 400, message: 'Item not found !' });
    return false;
  }
  const resault = await CotactInfo.updateOne(
    { _id: _id },
    { $set: { text: text } },
    err => {
      if (!err) res.status(200).send({ code: 200, message: 'Changes saved  ' });
      else res.status(400).send({ code: 400, message: 'Something goes wrong' });
    }
  );

  console.log(resault);
};
