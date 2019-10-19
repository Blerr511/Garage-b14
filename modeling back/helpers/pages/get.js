const { Page } = require('../../mongoose/Schemas');

module.exports = async (req, res) => {
  const page = await Page.find({});
  if (page) {
    res.status(200).send(page);
  } else res.status(404).send({ message: 'Pages not found !' });
};
