const fs = require('fs');

let writeJsonFile = (path, data) => {
  const jsonStr = JSON.stringify(data);
  fs.writeFile(path, jsonStr, (err) => {
    if (err) throw err;
    console.log('Jsonの書き込みに成功しました');
  });
}

// ファイルの存在確認
let isExistFile = (file) => {
  try {
    fs.statSync(file);
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

let genJson = (fileName, input) => {
  const filePath = 'new_posts/' + fileName;
  if (isExistFile(filePath)) {
    console.log('ファイルが存在します');
  } else {
    writeJsonFile(filePath, input);
  }
}

module.exports = genJson;