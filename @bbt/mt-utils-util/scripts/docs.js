const path = require('path')
const fs = require('fs')
const jsDocParser = require('jsdoc-to-markdown');

const listAllFiles = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'src'));
  return files.map((file) => {
    return {
      name:file,
      path: path.join(process.cwd(), 'src') + file
    }
  })
}

const docs = jsDocParser.renderSync({
  files: path.join(process.cwd(), 'src')+'/*.js'
});

const readme = path.resolve(process.cwd()+'/README.md');
console.log(readme);

fs.writeFileSync(readme,docs)