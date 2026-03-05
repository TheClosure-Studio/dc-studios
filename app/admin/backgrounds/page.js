import { supabase } from '@/lib/supabase';
import BackgroundsClient from './BackgroundsClient';

export const dynamic = 'force-dynamic';

export default async function BackgroundsPage() {
  const { data: bgs } = await supabase
    .from('backgrounds')
    .select('*')
    .order('created_at', { ascending: false });

  // Dynamically group backgrounds by category
  const allItems = (bgs || []).reduce((acc, bg) => {
    if (!acc[bg.category]) {
      acc[bg.category] = [];
    }
    acc[bg.category].push(bg);
    return acc;
  }, {});

  return <BackgroundsClient allItems={allItems} />;
}
