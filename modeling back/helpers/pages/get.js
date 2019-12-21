const { Page } = require('../../mongoose/Schemas');

module.exports = async (req, res) => {
  const LIMIT = req.query.limit ? +req.query.limit : 10;
  const PAGE = req.query.page ? +req.query.page : 0;
  const C_LIMIT = req.query.contentLimit ? +req.query.contentLimit : 20;
  const C_PAGE = req.query.contentPage ? +req.query.contentPage : 0;
  const page = await Page.find({})
    .skip(LIMIT * PAGE)
    .limit(LIMIT);
  const resp = JSON.parse(JSON.stringify(page));
  for (let i = 0; i < resp.length; i++) {
    resp[i].contentCount = resp[i].content.length;
    resp[i].content = resp[i].content.slice(
      C_PAGE * C_LIMIT,
      (C_PAGE + 1) * C_LIMIT
    );
  }

  const count = await Page.countDocuments({});

  if (page) {
    res.status(200).send({ count: count, data: resp });
  } else res.status(404).send({ message: 'Pages not found !' });
};
