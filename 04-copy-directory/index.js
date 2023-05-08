const fs = require('fs');
const path = require('path');
let newDirPath = path.join(__dirname, 'files-copy');
let oldDirPath = path.join(__dirname, 'files');

function copyDir() {
  fs.stat(newDirPath, function (err) {
    if (!err) {
      fs.rm(newDirPath, { recursive: true }, (err) => {
        if (err) throw err;
        addFiles();
      });
    } else {
      addFiles();
    }
  });
}

const addFiles = () => {
  fs.mkdir(newDirPath, (err) => {
    if (err) throw err;
  });
  fs.readdir(oldDirPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.map((element) => {
      if (element.isFile()) {
        fs.copyFile(
          oldDirPath + '\\' + element.name,
          newDirPath + '\\' + element.name,
          (err) => {
            if (err) throw err;
          }
        );
      }
    });
  });
};

copyDir();
