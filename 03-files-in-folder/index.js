const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(
  dirPath,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    console.log(
      files
        .filter((i) => !i.isDirectory())
        .map((i) => {
          let biblondi =
            path.parse(i.name).name + ' - ' + path.extname(i.name).substring(1); //?
          fs.stat(
            dirPath + '/' + i.name,
            (error, stats) => {
              if(error)  throw error;
              console.log(
                biblondi + ' - ' + (stats.size / 1024).toFixed(3) + 'kb'
              ); 
            }
          );
        })
    );
  }
);


