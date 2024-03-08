// utils.js
const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadImage(url, localPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localPath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(localPath); // successfully downloaded and saved
      });
    }).on('error', err => {
      fs.unlinkSync(localPath); // Delete the file async. (But we don't check the result)
      reject(err.message);
    });
  });
}

module.exports = { downloadImage };