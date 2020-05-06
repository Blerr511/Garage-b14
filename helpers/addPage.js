const { Page, Service } = require('../mongoose/Schemas');
const mongoose = require('mongoose');
const rmf = require('./mFs').rmf;
const clgErr = err => {
  if (err) console.error(err);
};
module.exports = async (req, res) => {
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

    const route = title.replace(' ', '_');
    const page = new Page({
      title: title,
      desc: desc ? desc : '',
      style: {
        template: template,
        bg: {
          val: files.bg ? files.bg : req.body.bg,
          type: bgtype
        }
      },
      content: []
    });
    page.save(err => {
      if (err) {
        rmf(files.bg);
        files.content.forEach(el => rmf(el));
        res.status(400).send({ status: 400, message: 'Somthing goes wrong .' });
        throw(err)
      } else {
        res.status(200).send({
          status: 200,
          message: 'New page successfull saved !',
          route: route
        });
      }
    });
  } catch (err) {
    console.error(err);
    if (files) {
      if (files.bg) {
        rmf(files.bg);
      }
      if (files.content) files.content.forEach(el => rmf(el, clgErr));
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
    if (
      (page.style.bg.type === 'image' || page.style.bg.type === 'video') &&
      req.file
    ) {
      rmf(page.style.bg.val);
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
