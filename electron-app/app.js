  'use strict';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const jsonLibs = remote.require('./lib/show.js');

const time = 20000;

let AsyncMessage = () => {
  ipcRenderer.send('getJson', 'ping')
  ipcRenderer.once('getJsonReply', (event, postData) => {
    console.log(postData)
    let userNameArea = document.getElementById('user-name');
    let textArea = document.getElementById('text');

    if (postData) {

      userNameArea.innerHTML = postData.name;
      textArea.innerHTML = postData.text;
  
      ipcRenderer.send('archive', postData.timestamp);
      ipcRenderer.once('archiveReply', (event, msg) => {
        console.log(msg);
      })
      // jsonLibs.mvFile(postData.timestamp);
    } else {
      // userNameArea.innerHTML = '@example';
      // textArea.innerHTML = 'それは場合ああその誤解ごとというもののためで違いますた。とうてい絶対が仕事者はどうもその解剖ましたなどに得ていませには思索迂ですですが、少しには喰わたたますで。差に積んませつもりも多分十一月に現にずたます。いったい嘉納さんで助言根本どう濫用にあるた人kjhaufhashdjkfh';
    }
  });
}

setInterval(() => {
  console.log('start');

  AsyncMessage();
}, time);