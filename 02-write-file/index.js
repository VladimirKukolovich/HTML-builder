const fs = require('fs');
const path = require('path');
const readline = require('readline');
fs.writeFile( path.join(__dirname,'text.txt'),'',(err)=>{
  if(err) throw err;
  console.log('Файл создан, вводим текст');
});
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if(input === 'exit'){
    console.log('goodbye');
    process.exit();
  }
  fs.appendFile(path.resolve(__dirname,'text.txt'), input +'\n', (error) => {
    if(error)console.log(error);
  });
  console.log('Write your text:');
  process.openStdin().on('keypress', function (_, key) {
    if (key && key.name === 'c' && key.ctrl) {
      console.log('goodbye');
      process.exit();
    }
  });
});
