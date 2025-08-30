import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qsurknendcxdbsprxtze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdXJrbmVuZGN4ZGJzcHJ4dHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTY1NjMsImV4cCI6MjA3MTkzMjU2M30.fBSj_sSzEVS7B00UEJZ-EW-_Z7CxuIqYOtpriYL-58I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
