const { Page, Service } = require('../mongoose/Schemas');
const rmf = require('./mFs').rmf;
const clgErr = err => {
  if (err) console.error(err);
};
module.exports = (req, res) => {
  const { title, template, desc } = req.body;
  let bgtype = req.body.bgtype;
  const { contentTitle, contentDesc } = req.body;
  const files = { bg: '', content: [] };

  try {
    if (req.files)
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname === 'bg') {
          files.bg = (appRoot + '\\' + req.files[i].path).replace(/\\/g, '/');
          bgtype = req.files[i].mimetype.split('/')[0];
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
          val: files.bg ? files.bg : req.body.bg,
          type: bgtype
        }
      },
      content: content
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
  const page = await Page.findOne({ _id: pageId });
  page &&
    page.content.forEach(el => {
      rmf(el.img);
    });

  page.style.bg.type !== 'color' && rmf(page.style.bg.val);

  const remove = await Page.deleteOne({ _id: pageId });
  res.status(200).send({ code: 200, message: 'Page removed' });
};

module.exports.editPage = async (req, res) => {
  try {
    const pageId = req.body.pageId;
    const updateData = {};
    const page = await Page.findById(pageId);
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.desc) updateData.desc = req.body.desc;
    if (req.body.bg && page.style.bg.type === 'color')
      updateData.style = {
        template: page.style.template,
        bg: { val: req.body.bg, type: req.body.bgType }
      };
    else if (page.style.bg.type === 'image/video' && req.file) {
      rmf(page.style.bg);
      updateData.style = {
        template: page.style.template,
        bg: {
          val: (appRoot + '\\' + req.file.path).replace(/\\/g, '/'),
          type: req.file.mimetype.split('/')[0]
        }
      };
    }
    const status = await Page.updateOne({ _id: pageId }, { $set: updateData });
    if (status.ok != 1) {
      res.status(400).send({ code: 400, message: 'Somthing goes wrong ' });
      return false;
    }
    res.status(200).send({ code: 200, message: 'Changes saved !' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 400, message: 'Somthing goes wrong ' });
    return false;
  }
};
