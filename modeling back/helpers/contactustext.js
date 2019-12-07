const { ContactPageText, ContactInfo } = require('../mongoose/Schemas');

module.exports.get = async (req, res) => {
  try {
    let contactpage = await ContactPageText.findOne({});

    if (!contactpage) {
      const contactpage = new ContactPageText({ text: '' });
      contactpage.save();
    }
    let contactInfo = await ContactInfo.find({});
    if (!contactInfo || contactInfo.length < 1) {
      contactInfo = [];
    }
    contactpage = await ContactPageText.findOne({});
    const response = { text: contactpage.text, address: contactInfo };

    res.status(200).send({ code: 200, message: 'OK', data: response });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, message: err });
  }
};

module.exports.edit = async (req, res) => {
  try {
    const { text } = req.body;
    if (text === undefined) {
      res.status(500).send({ code: 500, message: '!error!' });
      return false;
    }

    await ContactPageText.updateOne({}, { text: text });
    res.status(200).send({
      code: 200,
      message: 'Changes successfull saved'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, message: err });
  }
};
