const { Page } = require('../../mongoose/Schemas');

module.exports = async (req, res) => {
  try {
    const LIMIT = req.query.limit ? +req.query.limit : 10;
    const PAGE = req.query.page ? +req.query.page : 0;
    const C_LIMIT = req.query.contentLimit ? +req.query.contentLimit : 20;
    const C_PAGE = req.query.contentPage ? +req.query.contentPage : 0;
    const page = await Page.find({})
      .skip(LIMIT * PAGE)
      .limit(LIMIT)
      .sort('position')
      .populate({
        path: 'content',
        options: {
          limit: C_LIMIT,
          skip: C_PAGE * C_LIMIT
        }
      });
    const count = await Page.countDocuments({});
    res.status(200).send({ count: count, data: page });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, message: 'Something goes wrong' });
  }
};

module.exports.single = async (req, res) => {
  try {
    const pageId = req.query.pageId;
    const C_LIMIT = req.query.contentLimit ? +req.query.contentLimit : 20;
    const C_PAGE = req.query.contentPage ? +req.query.contentPage : 0;
    const page = await Page.findOne({ _id: pageId }).populate({
      path: 'content',
      options: {
        limit: C_LIMIT,
        skip: C_PAGE * C_LIMIT
      }
    });

    const count = await page.contentCount;
    res.status(200).send({ count: count, data: page });
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: 'Pages not found !' });
  }
};

module.exports.changePosition = async (req, res) => {
  try {
    const { _id, position } = req.body;
    const page = await Page.findOne({ _id: _id });
    if (!page) throw 'page not found';
    await Page.updateOne({ _id: _id }, { $set: { position: 999 } });
    await Page.updateOne(
      { position: position },
      { $set: { position: page.position } }
    );
    await Page.updateOne({ _id: _id }, { $set: { position: position } });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'error' });
  }
};
