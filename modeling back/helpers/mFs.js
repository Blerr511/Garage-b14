const fs = require('fs');

module.exports.rmf = async urlPath => {
  try {
    if (typeof urlPath === 'string') {
      const path = urlPath.replace(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\?]+)?(?::{1}\d{0,4}){0,1}/,
        global.appDir
      );

      fs.unlinkSync(path);
      return { ok: true, count: 1 };
    } else if (urlPath instanceof Array) {
      let deletedCount = 0;
      path.forEach(el => {
        fs.unlinkSync(
          el.replace(
            /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\?]+)?(?::{1}\d{0,4}){0,1}/,
            global.appDir
          )
        );
        deletedCount++;
      });

      return { ok: deletedCount > 0, count: deletedCount };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: error };
  }
};
