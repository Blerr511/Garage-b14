const mongoose = require('mongoose');
const fs = require('fs');
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
  if (typeof contentId === 'string') {
    Page.findOne({ _id: pageId }, (err, doc) => {
      if (!err) {
        try {
          for (let i = 0; i < doc.content.length; i++) {
            if (
              JSON.stringify(doc.content[i]._id) == JSON.stringify(contentId)
            ) {
              fs.unlink(doc.content[i].img, err => {
                if (err) console.error(err);
              });
              break;
            }
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error(err);
      }
    });
    const u = await Page.updateOne(
      { _id: pageId },
      {
        $pull: {
          content: { _id: new mongoose.Types.ObjectId(contentId) }
        }
      }
    );

    const response = {};
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
  }
};
