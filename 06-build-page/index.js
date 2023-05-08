const fs = require('fs');
const path = require('path');
let fold = path.join(__dirname, 'styles');
let components = path.join(__dirname, 'styles');
const stream = fs.ReadStream( path.join(__dirname, 'template.html'), 'utf-8');
let newDirPath = path.join(__dirname, 'project-dist');

function buildPage() {
  fs.stat(newDirPath, function (err) {
    if (!err) {
      fs.rm(newDirPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    } else {
      fs.mkdir(newDirPath, (err) => {
        if (err) throw err;
      });
      stream.on('data', chunk => console.log(chunk));

      //   fs.appendFile(path.resolve(__dirname,'project-dist/index.html'), '', (error) => {
      //     if(error)console.log(error);
      //   });

      fs.readdir(components, {withFileTypes: true}, (err, files)=> {
        if(err) throw err;
        const recStreamHtml = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
        files.forEach((i) => {
          if(i.isFile() && path.extname(i.name) === '.html' ){
            console.log(i.chunk);
            let streamRead = fs.createReadStream(path.join(components, i.name));
            streamRead.pipe(recStreamHtml);
          }
        });
      });
 

      fs.readdir(fold, {withFileTypes: true}, (err, files)=> {
        if(err) throw err;
        const recStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
        files.forEach((i) => {
          if(i.isFile() && path.extname(i.name) === '.css' ){
            let streamRead = fs.createReadStream(path.join(fold, i.name));
            streamRead.pipe(recStream);
          }
        });
      });
    }
  });

}
buildPage();