import fs from 'fs';

function check() {
  const data = JSON.parse(fs.readFileSync('maternity_urls.json', 'utf8'));
  
  const failUrl = "https://ksbqwgirdixxcfmnlytu.supabase.co/storage/v1/object/public/admin-uploads/1773142332688-wa0xvx-1000371417.jpg";
  const matched = data.find(d => d.url.includes("1773142332688"));
  
  if (matched) {
    console.log("Found URL in DB. Length:", matched.url.length);
    console.log("Expected length:", failUrl.length);
    
    // Print char codes for the last 10 characters
    const str = matched.url;
    console.log("Last 10 chars:");
    for (let i = str.length - 10; i < str.length; i++) {
       console.log(`Char ${i}: '${str[i]}' (Code: ${str.charCodeAt(i)})`);
    }
  }
}

check();
