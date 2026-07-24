require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (\!url || \!key) {
  console.error('Missing Supabase URL or key');
  process.exit(1);
}
const supabase = createClient(url, key);
(async () => {
  const { data, error } = await supabase.from('categories').select('id,name,slug,image');
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(JSON.stringify(data, null, 2));
})();
