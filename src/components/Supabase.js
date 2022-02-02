import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyNDMzNCwiZXhwIjoxOTU4OTAwMzM0fQ.8IZZRsM8OxQaB6h3a8MHNsz2Gl-CbTgbFiOqlEZ-LhQ';
const SUPABASE_URL = 'https://hvcyaxgayljwzrrrxbfv.supabase.co';
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);