import fs from 'fs';

async function check() {
  const data = JSON.parse(fs.readFileSync('maternity_urls.json', 'utf8'));
  
  let okURL = null;
  let failURL = null;
  
  for(let i=0; i<data.length; i++) {
    const url = data[i].url;
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status === 200 && !okURL) {
        okURL = url;
      }
      if (res.status !== 200 && !failURL) {
        failURL = url;
      }
    } catch(e) {}
  }
  
  console.log("OK URL:   '" + okURL + "'");
  console.log("FAIL URL: '" + failURL + "'");
}

check();
