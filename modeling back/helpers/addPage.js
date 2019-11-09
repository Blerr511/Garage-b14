const { Page, Service } = require('../mongoose/Schemas');
const fs = require('fs');
const clgErr = err => {
  if (err) console.log(err);
};
module.exports = (req, res) => {
  const { title, titlePosition, desc, template, bgtype } = req.body;
  const { contentTitle, contentDesc } = req.body;

  const files = { bg: '', content: [] };
  try {
    if (req.files)
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname === 'bg') {
          (files.bg = appRoot + '\\' + req.files[i].path).replace(/\\/g, '/');
        } else if (req.files[i].fieldname === 'contentFile') {
          files.content.push(
            (appRoot + '\\' + req.files[i].path).replace(/\\/g, '/')
          );
        }
      }
    const content = [];
    if (contentTitle && contentTitle instanceof Array)
      for (let i = 0; i < contentTitle.length; i++) {
        content.push(
          new Service({
            title: contentTitle[i],
            desc: contentDesc[i],
            img: files.content[i]
          })
        );
      }
    else if (contentTitle && !(contentTitle instanceof Array)) {
      content.push(
        new Service({
          title: contentTitle,
          desc: contentDesc,
          img: files.content[0]
        })
      );
    }
    const route = title.replace(' ', '_');
    const page = new Page({
      title: title,
      desc: desc,
      style: {
        template: template,
        bg: {
          val: files.bg,
          type: bgtype
        },
        titlePosition: titlePosition
      },
      content: content,
      route: route
    });
    page.save(err => {
      if (err) {
        fs.unlink(files.bg, clgErr);
        files.content.forEach(el => fs.unlink(el, clgErr));
        res.status(400).send({ status: 400, message: 'Somthing goes wrong .' });
      } else {
        res.status(200).send({
          status: 200,
          message: 'New page successfull saved !',
          route: route
        });
      }
    });
  } catch (err) {
    if (files) {
      if (files.bg) {
        fs.unlink(files.bg, clgErr);
      }
      if (files.content) files.content.forEach(el => fs.unlink(el, clgErr));
    }
  }
};

module.exports.removePage = async (req, res) => {
  const pageId = req.body.pageId;
  Page.findOne({ _id: pageId }, (err, doc) => {
    if (!err) {
      try {
        doc.content.forEach(el => {
          fs.unlink(el.img.replace(appRoot, appDir), err => {
            if (err) console.log(err);
            else console.log('file removed');
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
  const remove = await Page.deleteOne({ _id: pageId });
  console.log(remove);
  res.status(200).send({ code: 200, message: 'Page removed' });
};
