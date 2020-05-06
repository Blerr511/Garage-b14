const fs = require('fs');
const path = require('path');
const shelli = require('shelljs');
const buff = fs.readFileSync(__dirname + '/config.json');
const { logPath, logFilename } = JSON.parse(buff);
const isDevMode = process.argv[2] === 'development';
const logFile = path.join(isDevMode ? __dirname : '', logPath, logFilename);
if (!fs.existsSync(isDevMode ? path.join(__dirname, logPath) : logPath)) {
  shelli.mkdir(
    '-p',
    path.join(__dirname, isDevMode ? path.join(__dirname, logPath) : logPath)
  );
}
if (!fs.existsSync(logFile)) {
  fs.appendFileSync(logFile);
}
const stream = fs.createWriteStream(logFile);
const debugLog = (..._) => {
  if (isDevMode) global.defaultConsole(_.join());
  stream.write(_ + '\n');
};
const debugLogError = (..._) => {
  if (isDevMode) global.defaultConsole(_.join());
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
};

module.exports.debugLog = debugLog;
module.exports.debugLogError = debugLogError;
