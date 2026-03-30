import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksbqwgirdixxcfmnlytu.supabase.co';
const supabaseKey = 'sb_publishable_ztbq0FxNRwYuVyrIjntIGg_m2urN8v8'; 
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('gallery_images').select('*').eq('category', 'Maternity').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return;
  }
  
  fs.writeFileSync('maternity_urls.json', JSON.stringify(data.map(d => ({id: d.id, url: d.image_urls[0]})), null, 2));
  console.log("Done checking Maternity URLs.");
}
check();
