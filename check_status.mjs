import fs from 'fs';

async function check() {
  const data = JSON.parse(fs.readFileSync('maternity_urls.json', 'utf8'));
  
  for(let i=0; i<data.length; i++) {
    const url = data[i].url;
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status !== 200) {
        const text = await res.text();
        console.log(`\nERROR payload for ${url}:`);
        console.log(text);
        break; // Just need to see one to know why it's failing
      }
    } catch(e) {
    }
  }
}

check();
