import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksbqwgirdixxcfmnlytu.supabase.co';
const supabaseKey = 'sb_publishable_ztbq0FxNRwYuVyrIjntIGg_m2urN8v8'; 
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Found ${data.length} gallery images.`);
  for(let i=0; i<data.length; i++) {
    console.log(`[${data[i].category}] ${data[i].title} - URLs:`, data[i].image_urls);
  }
}
check();
