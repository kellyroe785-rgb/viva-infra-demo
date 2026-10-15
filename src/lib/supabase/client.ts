import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are configured and not default template placeholders
export const isSupabaseConfigured: boolean = Boolean(
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim() !== '' &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('placeholder') &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseAnonKey.includes('your-anon-key') &&
  !supabaseAnonKey.includes('your_key_here')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl.trim(), supabaseAnonKey.trim(), {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Track verified live connection status to satisfy "Do not claim Supabase is connected until a real database query succeeds"
let verifiedStatus: boolean | null = null;
let verificationInFlight: Promise<boolean> | null = null;

export async function isSupabaseVerified(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    verifiedStatus = false;
    return false;
  }

  if (verifiedStatus !== null) {
    return verifiedStatus;
  }

  if (verificationInFlight) {
    return verificationInFlight;
  }

  verificationInFlight = (async () => {
    try {
      // Execute a lightweight query to test real database connectivity
      const { error } = await supabase.from('site_settings').select('key').limit(1);
      if (!error) {
        verifiedStatus = true;
        return true;
      }
      
      // If site_settings is empty or not yet migrated, try projects table
      const { error: projError } = await supabase.from('projects').select('id').limit(1);
      if (!projError) {
        verifiedStatus = true;
        return true;
      }

      verifiedStatus = false;
      return false;
    } catch {
      verifiedStatus = false;
      return false;
    } finally {
      verificationInFlight = null;
    }
  })();

  return verificationInFlight;
}

export function getSupabaseProjectHost(): string | null {
  if (!supabaseUrl) return null;
  try {
    const url = new URL(supabaseUrl);
    return url.host;
  } catch {
    return null;
  }
}
