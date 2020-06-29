'use strict';

const { ipcMain } = require('electron');
const fs = require('fs');
const jsonfile = require('jsonfile');

const postFilesPath = '../get-posts/';

ipcMain.on('getJson', (event, arg) => {
  console.log(arg);
  jsonLibs.sortFiles((postData) => {
    event.sender.send('getJsonReply', postData);
  });
  // event.sender.send('getJsonReply', jsonLibs.sortFiles());
});

ipcMain.on('archive', (event, timestamp) => {
  jsonLibs.mvFile(timestamp, () => {
    event.sender.send('archiveReply', 'Success!');
    console.log("ファイル移動完了");
  });
});

let jsonLibs = {


  sortFiles: (callback) => {
    console.log('sortプログラム入った');
    fs.readdir(`${postFilesPath}new_posts`, (err, files) => {
      console.log('readdirのコールバック入った');
      if (err) throw err;
      if (files) {
        // console.log('num3');
        // console.log(files[0]);
        jsonfile.readFile(`${postFilesPath}new_posts/${files[0]}`, {
          encoding: 'utf-8', 
          reviver: null, 
          throws: true
        }, (err, data) => {
          console.log('num2');
          console.log(data);
          callback(data);
        });
      } else {
        callback(false);
      }
      console.log('num1');
      console.log(files);
    });
  },

  mvFile: (fileName, callback) => {
    console.log('ファイル場所変更プログラム');
    fs.rename(`${postFilesPath}new_posts/${fileName}.json`, `${postFilesPath}archive/${fileName}.json`, () => {
      callback();
    });
  }

}


module.exports = jsonLibs;