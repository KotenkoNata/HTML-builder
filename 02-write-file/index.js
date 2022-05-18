const fs = require('fs');
const { stdout, stdin, exit} = process;


fs.writeFile(`${__dirname}/newfile.txt`, '', function (err) {
  if (err) throw err;
});

stdout.write('Please type some text\n');

stdin.on('data', data => {
  const text = data.toString();

  if(text === 'exit\n'){
    console.log('See you next time');
    exit();
  }
  fs.appendFile(`${__dirname}/newfile.txt`, text, (err)=>{
    if (err) throw err;
  });
  stdout.write('Please type some text\n');
});

process.on('SIGINT', function() {
  console.log('See you next time');
  exit();
});
