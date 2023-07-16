const checkExtension = (fileName) => {
  const EXTENSIONS = ['js', 'json', 'html', 'css', 'txt'];
  
  const extension = fileName.split('.').pop();

  const file = {
    extension: extension,
    result: EXTENSIONS.includes(extension),
  }
    return file;
  }
    

module.exports = checkExtension;