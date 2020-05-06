const mongoose = require('mongoose');
const rmf = require('./mFs').rmf;
const { Service, Page } = require('../mongoose/Schemas');
module.exports.add = async (req, res) => {
  const { title, desc, pageId } = req.body;
  const response = {};

  try {
    const file = req.files[0];

    const page = await Page.findOne({ _id: pageId });
    if (!page) throw 'page not found';
    if (page.style.template !== 'template3') {
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
      if (t.ok === 1) {
        response.code = 200;
        response.message = 'New contetn added !';
        const page = await Page.findOne({ _id: pageId }).populate('content');

        response.data = page;
      } else {
        throw t;
      }
    } else {
      const files = req.files;
      let thumbnail = (appRoot + '\\' + 'uploads\\Placeholder.jpg').replace(
        /\\/g,
        '/'
      );
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.fieldname === 'thumbnail') {
          thumbnail = (appRoot + '\\' + file.path).replace(/\\/g, '/');
        } else if (file.fieldname === 'model') {
          images.push((appRoot + '\\' + file.path).replace(/\\/g, '/'));
        }
      }
      const content = new Service({
        title: title,
        desc: desc,
        img: thumbnail,
        other: images
      });
      await content.save();
      const t = await Page.updateOne(
        { _id: pageId },
        {
          $push: {
            content: content._id
          }
        }
      );
      if (t.ok === 1) {
        response.code = 200;
        response.message = 'New contetn added !';
        const page = await Page.findOne({ _id: pageId }).populate('content');
        response.data = page;
      } else throw 'someting goes wrong';
    }
    res.status(response.code).send(response);
  } catch (err) {
    console.error(err);
    response.code = 400;
    response.message = 'Somthing goes wrong !';
    res.status(response.code).send(response);
  }
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
    if (req.files) {
      let hasModel = false;
      const files = {};
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        if (file.fieldname === 'logo') {
          rmf(content.img);
          content.img = (appRoot + '\\' + file.path).replace(/\\/g, '/');
        } else if (file.fieldname === 'model') {
          if (content.other && content.other.files) {
            for (const k in content.other.files) {
              if (content.other.files.hasOwnProperty(k)) {
                const file = content.other.files[k];
                if (/\..+$/.test(file)) rmf(file);
              }
            }
          }
          if (/\.(obj|gltf|fbx|JSON|)$/.test(file.originalname)) {
            hasModel = true;
            let l = file.originalname.split('.');
            files.src = (appRoot + '\\' + file.path).replace(/\\/g, '/');
            files.type = l[l.length - 1];
          } else if (/\.mtl$/.test(file.originalname)) {
            files.material = (appRoot + '\\' + file.path).replace(/\\/g, '/');
          }
        }
      }

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        if (file.fieldname === 'model') {
          if (/\.(png|jpg|jpeg)$/.test(file.originalname)) {
            if (hasModel) {
              files.txt = (appRoot + '\\' + file.path).replace(/\\/g, '/');
            } else {
              files.type = 'image';
              files.src = (appRoot + '\\' + file.path).replace(/\\/g, '/');
            }
          }
        }
      }
      content.other = { files };
    }
    await content.save();

    res.status(200).send({ code: 200, message: 'Changes saved' });
  } catch (err) {
    console.error(err);
    response.code = 400;
    response.message = 'Somthing goes wrong !';
    res.status(response.code).send(response);
  }
};
