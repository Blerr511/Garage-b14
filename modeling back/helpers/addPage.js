const { Page } = require('../mongoose/Schemas');

module.exports = (req, res) => {
  const {
    title,
    titlePosition,
    desc,
    content,
    template,
    bgtype,
    bg
  } = req.body;
  console.log(title, titlePosition, desc, content, template, bgtype, bg);
};
