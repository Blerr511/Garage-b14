const fs = require('fs');
const path = require('path');
const buff = fs.readFileSync(__dirname + '/config.json');
const { logPath, logFilename } = JSON.parse(buff);
const logFile = path.join(
  process.argv[2] === 'development' ? __dirname : '',
  logPath,
  logFilename
);

if (!fs.existsSync(logPath)) {
  const paths = logPath.split(/\//g);
  let currentPath = '';
  for (let i = 0; i < paths.length; i++) {
    currentPath = path.join(currentPath, paths[i]);
    if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
  }
}

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile);
}
const stream = fs.createWriteStream(logFile);
const debugLog = (..._) => stream.write(_ + '\n');
const debugLogError = (..._) =>
  stream.write(
    '------------- error--- ' +
      new Date() +
      '-----------' +
      '\n' +
      _ +
      '\n' +
      '--------------------------------------' +
      '\n'
  );

module.exports.debugLog = debugLog;
module.exports.debugLogError = debugLogError;
