import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://ksbqwgirdixxcfmnlytu.supabase.co';
const supabaseKey = 'sb_publishable_ztbq0FxNRwYuVyrIjntIGg_m2urN8v8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  const { data, error } = await supabase.from('gallery_images').select('*').in('category', ['Newborn', 'newBorn']).limit(10);
  if (error) {
    fs.writeFileSync('db_out_newborn.json', JSON.stringify({error}));
  } else {
    fs.writeFileSync('db_out_newborn.json', JSON.stringify(data, null, 2));
  }
}

checkDb();
