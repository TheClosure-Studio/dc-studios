import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksbqwgirdixxcfmnlytu.supabase.co';
const supabaseKey = 'sb_publishable_ztbq0FxNRwYuVyrIjntIGg_m2urN8v8'; 
const supabase = createClient(supabaseUrl, supabaseKey);

async function clean() {
  const { data, error } = await supabase.from('gallery_images').select('id, title, category, image_urls');
  if (error || !data) return console.error(error);

  let deleted = 0;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row.image_urls || row.image_urls.length === 0) continue;
    
    const url = row.image_urls[0];
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status === 400 || res.status === 404) {
        console.log(`Deleting ${row.id} - ${row.title} - Dead link: ${url}`);
        await supabase.from('gallery_images').delete().eq('id', row.id);
        deleted++;
      }
    } catch(e) {
      console.log(`Assuming ${url} is dead due to fetch fail`);
    }
  }
  console.log(`Cleanup complete. Deleted ${deleted} orphaned DB rows.`);
}

clean();
