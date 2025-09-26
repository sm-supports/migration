import { createClient } from '@supabase/supabase-js'

// Create supabase client only in browser environment
const createSupabaseClient = () => {
  if (typeof window === 'undefined') {
    // During SSG/SSR, return a mock client to prevent errors
    return null
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
    return null
  }
  if (!supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient()
