const mongoose = require('mongoose');
const rmf = require('./mFs').rmf;
const { Service, Page } = require('../mongoose/Schemas');

module.exports.add = async (req, res) => {
  const { title, desc, pageId } = req.body;
  const file = req.file;

  const newService = new Service({
    title: title,
    desc: desc,
    img: file ? (appRoot + '\\' + file.path).replace(/\\/g, '/') : ''
  });
  await newService.save();
  const t = await Page.updateOne(
    { _id: pageId },
    {
      $push: {
        content: newService._id
      }
    }
  );
  const response = {};
  if (t.ok === 1) {
    response.code = 200;
    response.message = 'New contetn added !';
    const page = await Page.findOne({ _id: pageId }).populate('content');

    response.data = page;
  } else {
    response.code = 400;
    response.message = 'Somthing goes wrong !';
  }
  res.status(response.code).send(response);
};

module.exports.remove = async (req, res) => {
  const { contentId, pageId } = req.body;

  const response = {};
  try {
    if (!contentId || !pageId) throw new Error();
    let u;
    if (typeof contentId === 'string') {
      await Service.deleteOne({ _id: contentId });

      u = await Page.updateOne(
        { _id: pageId },
        {
          $pull: {
            content: contentId
          }
        }
      );
    } else if (contentId instanceof Array) {
      await Service.deleteMany({ _id: { $in: contentId } });
      u = await Page.updateOne(
        { _id: pageId },
        {
          $pull: {
            content: {
              $in: contentId.map(el => new mongoose.Types.ObjectId(el))
            }
          }
        }
      );
    }
    if (u.ok === 1) {
      response.code = 200;
      response.message = 'Content element removed !';
      const page = await Page.findOne({ _id: pageId }).populate('content');
      response.data = page;
    } else {
      throw new Error();
    }
    res.status(response.code).send(response);
  } catch (err) {
    response.code = 400;
    response.message = 'Somthing goes wrong !';
    res.status(response.code).send(response);
  }
};

module.exports.edit = async (req, res) => {
  const { contentId, desc, title } = req.body;
  const response = {};
  try {
    if (!contentId) throw new Error(null);

    const content = await Service.findOne({ _id: contentId });
    if (!content) throw new Error();
    if (desc) content.desc = desc;
    if (title) content.title = title;
    if (req.file) {
      rmf(content.img);
      content.img = (appRoot + '\\' + req.file.path).replace(/\\/g, '/');
    }
    content.save();
    res.status(200).send({ code: 200, message: 'Changes saved' });
  } catch (err) {
    console.error(err);
    response.code = 400;
    response.message = 'Somthing goes wrong !';
    res.status(response.code).send(response);
  }
};
