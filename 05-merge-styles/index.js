
const fs = require('fs');
const path = require('path');
let fold = path.join(__dirname, 'styles');
fs.writeFile( path.resolve(__dirname, 'project-dist', 'bundle.css'),'',(err)=>{
  if(err) throw err;
});

fs.readdir(fold, {withFileTypes: true}, (err, files)=> {
  if(err) throw err;
  const recStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
  files.forEach((i) => {
    if(i.isFile() && path.extname(i.name) === '.css' ){
      let streamRead = fs.createReadStream(path.join(fold, i.name));
      streamRead.pipe(recStream);
    }
  });
});
