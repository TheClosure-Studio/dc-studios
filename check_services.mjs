import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksbqwgirdixxcfmnlytu.supabase.co';
const supabaseKey = 'sb_publishable_ztbq0FxNRwYuVyrIjntIGg_m2urN8v8'; 
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('services').select('*').limit(1);
  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log(`Columns structure:`);
    if (data.length > 0) console.log(Object.keys(data[0]));
    console.log(data);
  }
}
check();
