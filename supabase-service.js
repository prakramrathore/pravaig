import { createClient } from '@supabase/supabase-js';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { SUPABASE_URL,SUPABASE_PUBLIC_KEY } from '@env';

const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydHh6aXJrdmFuYWdzZWRkc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY1NTAzNjUsImV4cCI6MTk2MjEyNjM2NX0.m8KoI-KC6ylRxuhNcK53sF2Ow_WcfJaRNrm5j09F29U';
const SUPABASE_URL = 'https://artxzirkvanagseddste.supabase.co';

console.log(SUPABASE_URL,'SUPABASE_URL');
const supabase = createClient(SUPABASE_URL,SUPABASE_PUBLIC_KEY, {
    localStorage:AsyncStorage,
});
export {supabase}