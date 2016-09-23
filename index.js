/**
 *
 */
var Path = require('path');
var Fs = require('fs-extra');


/**
 *
 */
function getFilePaths(path, callback) {
  return Fs.walk(path).on('data', function(item) {
    if (item.stats.isFile()) callback(item.path);
  });
}


/**
 *
 */
function normalizeData(data, packageName) {
  return data.replace(/_____pkgName_____/g, packageName);
}


/**
 *
 */
function normalizePath(path, packageName) {
  return Path.join(__dirname, 'packages', packageName, Path.basename(path, Path.extname(path)));
}


/**
 *
 */
function copyTemplate(packageNames) {
  var templatePath = Path.join(__dirname, 'templates');

  getFilePaths(templatePath, function(path) {
    var data = Fs.readFileSync(path, 'utf8');

    packageNames.forEach(function(packageName) {
      Fs.outputFileSync(
        normalizePath(path, packageName),
        normalizeData(data, packageName)
      );
    });
  });
}


/**
 *
 */
copyTemplate([
  'simon.degraeve',
  'simon-degraeve',
  'simondegraeve',
]);
