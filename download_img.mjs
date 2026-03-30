import fs from 'fs';
import https from 'https';

const url = "https://ksbqwgirdixxcfmnlytu.supabase.co/storage/v1/object/public/admin-uploads/1773254474133-4ov6wo-1000499055.jpg";

https.get(url, (res) => {
  const path = "test_image.jpg";
  const filePath = fs.createWriteStream(path);
  res.pipe(filePath);
  filePath.on('finish', () => {
    filePath.close();
    console.log("Download Completed!");
  });
});
