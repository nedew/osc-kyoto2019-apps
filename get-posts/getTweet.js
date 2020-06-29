const twitter = require('twitter');
const fs = require('fs');
const genJson = require('./genJson.js');

const client = new twitter(JSON.parse(fs.readFileSync('secret.json','utf-8')));

const main = async () => {
  const stream = await client.stream('statuses/filter', {'track':'#osckyoto'});
  stream.on('data', async data => {
    const now = Date.now();

    const json = {
      name: '@' + data.user.screen_name,
      text: data.text,
      timestamp: now
    };

    genJson(`${now}.json`, json);

    console.log(data);
  });
}

main();