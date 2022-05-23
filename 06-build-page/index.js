const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');

async function createFolder(pathToFolder){
  fs.exists(pathToFolder, (exists) => {
    if(!exists){
      fsPromises.mkdir(pathToFolder, err => {
        if(err) throw  err;
      });
    }
  });
}

async function createFile(pathToFile, data){
  return await fsPromises.writeFile(pathToFile, data);
}

async function merge(){

  let styles = [];

  const filesArray = await fsPromises.readdir(stylesPath, {withFileTypes: true});

  for (const file of filesArray) {
    if(path.extname(file.name) === '.css'){
      const content = await fsPromises.readFile(path.join(stylesPath,`${file.name}`), 'utf-8');
      styles.push(`${content}\n`);
    }
  }

  await createFile(path.join(distPath, 'style.css'), styles.join(''));
}

async function copiedFolder(FromFolderPath, ToFolderPath){
  await fsPromises.rm(ToFolderPath, {force: true, recursive: true});
  await fsPromises.mkdir(ToFolderPath, {recursive: true});

  const array = await fsPromises.readdir(FromFolderPath,{ withFileTypes: true });

  for(let arr of array){
    if (arr.isDirectory()) {
      await fsPromises.mkdir(path.join(FromFolderPath, arr.name), {recursive: true});
      await copiedFolder(path.join(FromFolderPath, arr.name), path.join(ToFolderPath, arr.name));
    }else if(arr.isFile()){
      await fsPromises.copyFile(path.join(FromFolderPath, arr.name), path.join(ToFolderPath, arr.name));
    }
  }
}

async function addComponents(){
  let html = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  let array = await fsPromises.readdir(path.join(__dirname, 'components'), {withFileTypes: true});

  for(let arr of array){
    const content = await fsPromises.readFile(path.join(__dirname, 'components', `${arr.name}`), 'utf-8');
    const regExp = new RegExp(`{{${(arr.name).split('.')[0]}}}`, 'g');
    html = html.replace(regExp, content);
  }
  await createFile(path.join(distPath, 'index.html'), html);
}



async function createPage() {
  await createFolder(distPath);
  await merge();
  await copiedFolder(path.join(__dirname, 'assets'), path.join(distPath, 'assets'));
  await addComponents();
}

createPage().then(r => console.log(r));





