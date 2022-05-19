const fs = require('fs');

fs.exists(`${__dirname}/files-copy`, (exists) => {
  if(!exists){
    fs.promises.mkdir(`${__dirname}/files-copy`).then(function() {
      console.log('Directory created successfully');
    }).catch(function() {
      console.log('Failed to create directory');
    });
  }
});

fs.readdir(`${__dirname}/files`,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.promises.copyFile(`${__dirname}/files/${file.name}`, `${__dirname}/files-copy/${file.name}`)
          .then(function () {
            console.log('File copied');
          }).catch(function (err) {
            console.log(err);
          });
      });
    }
  });