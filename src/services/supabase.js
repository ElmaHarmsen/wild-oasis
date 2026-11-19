import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yplpctfimrqevydpykpl.supabase.co";
const supabaseKey = "sb_publishable_8CR4yt4IXflLWurNOyKwjw_DspQg1lK";

export const supabase = createClient(supabaseUrl, supabaseKey);
