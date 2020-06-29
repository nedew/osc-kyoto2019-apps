let Mastodon = require('mastodon');

let M = new Mastodon({
  access_token: 'YOUR_TOKEN',
  timeout_ms: 60 * 1000,
  api_url: 'https://mstdn.io/api/v1/',
});

M.get('timelines/public', (err, data, res) => {
  if(!err) {
    for (key in data) {
      // console.log(data[key].content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''));
      console.log(data[key]);
    }
  }
});