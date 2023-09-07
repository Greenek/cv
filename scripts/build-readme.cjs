const fs = require('fs');

const markdownPath = './src/content';

function getFiles(path) {
  const fileList = fs.readdirSync(path);
  
  return fileList.map((file) => {
    const content = fs.readFileSync(`${path}/${file}`, 'utf8');

    return content.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gmi, '').replace(/^[\n]*/g, '');
  });
}

const files = getFiles(markdownPath);

fs.writeFileSync('./README.md', files.join('\n***\n\n'));