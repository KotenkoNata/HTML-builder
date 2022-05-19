const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const stream = fs.createWriteStream(path.join(__dirname, 'newfile.txt'), {
  encoding: 'utf8'
});

rl.write('Please type some text\n');

rl.on('line', (data) => {
  if(data === 'exit'){
    rl.close();
  }
  stream.write(`${data}\n`, (err)=>{
    if (err) throw err;
  });
});

rl.on('close',()=>{
  console.log('See you next time');
  process.exit();
});

rl.on('SIGINT',()=>{
  console.log('See you next time');
  process.exit();
});

