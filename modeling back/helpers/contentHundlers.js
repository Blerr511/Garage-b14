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
  const t = await Page.updateOne(
    { _id: pageId },
    {
      $push: {
        content: newService
      }
    }
  );
  const response = {};
  if (t.ok === 1) {
    response.code = 200;
    response.message = 'New contetn added !';
    const page = await Page.findOne({ _id: pageId });

    response.data = page;
  } else {
    response.code = 400;
    response.message = 'Somthing goes wrong !';
  }
  res.status(response.code).send(response);
};

module.exports.remove = async (req, res) => {
  const { pageId, contentId } = req.body;
  const response = {};
  const tPage = await Page.findOne({ _id: pageId });
  let u;
  if (typeof contentId === 'string') {
    if (tPage) {
      for (let i = 0; i < tPage.content.length; i++) {
        if (
          JSON.stringify(tPage.content[i]._id) === JSON.stringify(contentId)
        ) {
          rmf(tPage.content[i].img);
          break;
        }
      }
    }
    u = await Page.updateOne(
      { _id: pageId },
      {
        $pull: {
          content: { _id: new mongoose.Types.ObjectId(contentId) }
        }
      }
    );
  } else if (contentId instanceof Array) {
    for (let i = 0; i < tPage.content.length; i++) {
      for (let j = 0; j < contentId.length; j++) {
        if (
          JSON.stringify(tPage.content[i]._id) === JSON.stringify(contentId[j])
        ) {
          rmf(tPage.content[i].img);
          break;
        }
      }
    }
    u = await Page.updateOne(
      { _id: pageId },
      {
        $pull: {
          content: {
            _id: { $in: contentId.map(el => new mongoose.Types.ObjectId(el)) }
          }
        }
      }
    );
  }
  if (u.ok === 1) {
    response.code = 200;
    response.message = 'Content element removed !';
    const page = await Page.findOne({ _id: pageId });
    response.data = page;
  } else {
    response.code = 400;
    response.message = 'Somthing goes wrong !';
  }
  res.status(response.code).send(response);
};
