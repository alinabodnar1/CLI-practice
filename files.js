const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const dataValidator = require('./helpers/dataValidator');
const checkExtension = require('./helpers/checkExtension');

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };
  const result = dataValidator(file);

  if (result.error) {
    console.log(chalk.red(`Please specify ${result.error.details[0].context.key} parametr`));
    return;
  }
  const check = checkExtension(fileName);

  if (!check.result) {
    console.log(chalk.red(`This app doesn't support file with ${check.extension} extension`));
    return;
  }
  const filePath = path.join(__dirname, 'files', fileName);

  try {
    await fs.writeFile(filePath, content, 'utf-8');

    console.log(chalk.green('File is created successfully'));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  const dir = await fs.readdir(path.join(__dirname, 'files'));
  // console.log(dir);
  if (dir.length === 0) {
    console.log(chalk.red('Directory is empty'));
    return;
  }
  console.log(dir);
};

const getInfo = async (fileName) => {
  const dir = await fs.readdir(path.join(__dirname, 'files'));

  if (!dir.includes(fileName)) {
    console.log(chalk.red(`There is not file with name ${fileName}`));
    return;
  }

  const content = await fs.readFile(path.join(__dirname, 'files', fileName), 'utf-8');
  // console.log(result);
  const extansion = path.extname(fileName);

  const name = path.basename(path.join(__dirname, 'files', fileName), extansion);

  const result = {
    name,
    extansion: extansion.slice(1),
    content,
  };
  console.log(result);
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
