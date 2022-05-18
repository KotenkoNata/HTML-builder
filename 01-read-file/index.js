const {ReadStream} = require('fs');

const stream = new ReadStream(`${__dirname}/text.txt`, {
  encoding: 'utf8'
});

stream.on('readable', function () {
  const data = stream.read();
  console.log(data);
});
