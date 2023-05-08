const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
fs.writeFile( path.join(__dirname,'text.txt'),'',(err)=>{
  if(err) throw err;
  console.log('File created, write your text:');
});
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if(input === 'exit'){
    console.log('Goodbye!');
    process.exit();
  }
  fs.appendFile(path.resolve(__dirname,'text.txt'), input +'\n', (error) => {
    if(error)console.log(error);
  });
  console.log('Write your text:');
  process.openStdin().on('keypress', function (_, key) {
    if (key && key.name === 'c' && key.ctrl) {
      console.log('Goodbye!!');
      process.exit();
    }
  });
});
