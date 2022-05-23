const path = require('path');
const fsPromises = require('fs/promises');


const stylesPath = path.join(__dirname, 'styles');
const filesPath = path.join(__dirname, 'project-dist', 'bundle.css');

let styles = [];

(async () => {

  const filesArray = await fsPromises.readdir(stylesPath, {withFileTypes: true});
  for (const file of filesArray) {
    if(path.extname(file.name) === '.css'){
      const content = await fsPromises.readFile(path.join(stylesPath,`${file.name}`), 'utf-8');
      styles.push(`${content}\n`);
    }
  }

  await fsPromises.writeFile(filesPath, styles.join(''));
})();
