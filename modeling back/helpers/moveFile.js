const fs = require('fs');

module.exports.move = function move(oldPath, newPath){
    return new Promise((resolve,reject)=>{
        fs.rename(oldPath, newPath, function(err) {
            if (err) {
              if (err.code === 'EXDEV') {
                copy();
              } else {
                reject(err);
              }
              return;
            }
            resolve();
          });
        
          function copy() {
            var readStream = fs.createReadStream(oldPath);
            var writeStream = fs.createWriteStream(newPath);
        
            readStream.on('error', reject);
            writeStream.on('error', reject);
        
            readStream.on('close', function() {
              fs.unlink(oldPath, resolve);
            });
        
            readStream.pipe(writeStream);
          }
    })
}

