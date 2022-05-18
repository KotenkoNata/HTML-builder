const fs = require('fs');
const path = require('path');
const {stat} = require('fs');

const folderPath = `${__dirname}/secret-folder`;

fs.readdir(folderPath, { withFileTypes: true },(err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if(file.isFile()){

        stat(`${__dirname}/secret-folder/${file.name}`, (error, stats)=>{
          if(error){
            console.log(error);
          } else{
            console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name)} - ${stats.size}`);
          }
        });
      }
    });
  }
});