const Mail = require('../mongoose/Schemas').Mail;

module.exports.get = async (req, res) => {
  try {
    let { page, limit, newOnyl } = req.query;
    page = +page;
    limit = +limit;
    if (!page) page = 0;
    if (!limit) limit = 50;

    const data = await Mail.find(newOnyl ? { readed: false } : {}, null, {
      sort: { readed: 1, date: -1 }
    })
      .skip(page * limit)
      .limit(limit);
    const count = await Mail.countDocuments(newOnyl ? { readed: false } : {});
    if (!data) {
      throw 'Mails not found';
    }
    res
      .status(200)
      .send({ status: 200, Message: 'Ok', data: data, count: count });
  } catch (err) {
    console.error(err);
    res.status(404).send({ status: 400, Message: err });
  }
};

module.exports.new = async (req, res) => {
  const { text, email, sender } = req.body;

  const senderMails = await Mail.find({ sender: sender });

  if (senderMails && senderMails.length > 0) {
    const lastMail = senderMails.sort((a, b) => b.date - a.date)[0];
    if (Date.now() - +lastMail.date <= 3 * 60 * 1000) {
      res.status(400).send({
        status: 400,
        message: 'We recive your message ,pleace wait for feedback'
      });
      return false;
    }
  }

  const newMail = new Mail({
    text: text,
    email: email,
    sender: sender,
    date: Date.now()
  });
  await newMail.save(err => {
    if (err) {
      res.status(500).send({ status: 500, message: err._message });
      return false;
    } else {
      res.status(200).send({ status: 200, message: 'Your message sended' });
    }
  });
};

module.exports.read = async (req, res) => {
  const { _id } = req.body;
  const del = await Mail.updateMany(
    typeof _id === 'string' ? { _id: _id } : { _id: { $in: _id } },
    { $set: { readed: true } }
  );
  if (del.ok === 1) {
    res.status(200).send({ status: 200, message: 'Status updated' });
  } else {
    res.status(500).send({ status: 500, message: 'Something goes wrong ' });
  }
};

module.exports.delete = async (req, res) => {
  const { _id } = req.body;
  const del = await Mail.deleteMany(
    typeof _id === 'string' ? { _id: _id } : { _id: { $in: _id } }
  );
  if (del.ok === 1 && del.deletedCount > 0) {
    res.status(200).send({ status: 200, message: 'Message deleted ' });
  } else {
    res.status(500).send({ status: 500, message: 'Something goes wrong ' });
  }
};

module.exports.count = async (req, res) => {
  const count = await Mail.countDocuments({ readed: false });

  res.status(200).send({ status: 200, message: 'Ok', data: count });
};
