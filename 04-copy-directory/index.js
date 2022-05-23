const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const FromFolderPath = path.join(__dirname, 'files');
const ToFolderPath = path.join(__dirname, 'files-copy');

fs.exists(ToFolderPath, (exists) => {
  if(!exists){
    fsPromises.mkdir(ToFolderPath, {recursive: true}).then(function() {
      console.log('Directory created successfully');
    }).catch(function() {
      console.log('Failed to create directory');
    });
  }
});

async function copiedFolder(FromFolderPath, ToFolderPath){
  await fsPromises.rm(ToFolderPath, {force: true, recursive: true});
  await fsPromises.mkdir(ToFolderPath, {recursive: true});

  fs.readdir(FromFolderPath,
    { withFileTypes: true },
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          fsPromises.copyFile(path.join(FromFolderPath, `${file.name}`), path.join(ToFolderPath,`${file.name}`))
            .then(function () {
              console.log('File copied');
            }).catch(function (err) {
              console.log(err);
            });
        });
      }
    });
}

copiedFolder(FromFolderPath, ToFolderPath).then(r => console.log(r));




