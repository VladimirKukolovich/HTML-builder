const fs = require('fs');
const path = require('path');
let fold = path.join(__dirname, 'styles');
let components = path.join(__dirname, 'components');
// const stream = fs.ReadStream( path.join(__dirname, 'template.html'), 'utf-8');
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
      //   stream.on('data', chunk => console.log(chunk));

      //   fs.appendFile(path.resolve(__dirname,'project-dist/index.html'), '', (error) => {
      //     if(error)console.log(error);
      //   });
      fs.readFile('06-build-page/template.html', (err, data) =>{
        if(err) throw err;

        console.log(data);
      });
      fs.readdir(components, {withFileTypes: true}, (err, files)=> {
        // console.log(files);

        if(err) throw err;
        const recStreamHtml = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
        let stream1 = fs.createReadStream(path.join(__dirname, 'template.html'));
        // console.log(recStreamHtml);
        console.log(!files);

        stream1.pipe(recStreamHtml);
        // files.forEach((i) => {
        //   console.log(i);
        //   if(i.isFile() && path.extname(i.name) === '.html' ){
        //     let streamRead = fs.createReadStream(path.join(components, i.name));
        //     console.log(streamRead);
        //     streamRead.pipe(recStreamHtml);
        //   }
        // });
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