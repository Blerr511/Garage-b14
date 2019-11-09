const { Page } = require('../../mongoose/Schemas');

module.exports = async (req, res) => {
  const LIMIT = req.query.limit ? +req.query.limit : 10;
  const PAGE = req.query.page ? +req.query.page : 0;
  const page = await Page.find({})
    .skip(LIMIT * PAGE)
    .limit(LIMIT);
  const count = await Page.countDocuments({});

  if (page) {
    res.status(200).send({ count: count, data: page });
  } else res.status(404).send({ message: 'Pages not found !' });
};
