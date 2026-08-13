/**
 * Supabase Client Stub (Prepared for Phase 6)
 * 
 * In Phase 6, this file will initialize the real Supabase client:
 * 
 * import { createClient } from '@supabase/supabase-js';
 * const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
 * const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
 * export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 */

export const isSupabaseConfigured = false;

export const supabase = {
  from: (tableName) => {
    return {
      select: () => {
        throw new Error(`[Supabase Stub] Supabase no está activo en Fase 1. Usando mockClient para la tabla ${tableName}.`);
      },
      insert: () => {
        throw new Error(`[Supabase Stub] Supabase no está activo en Fase 1.`);
      },
      update: () => {
        throw new Error(`[Supabase Stub] Supabase no está activo en Fase 1.`);
      },
      delete: () => {
        throw new Error(`[Supabase Stub] Supabase no está activo en Fase 1.`);
      }
    };
  },
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.reject(new Error('Supabase no activo en Fase 1')),
    signOut: () => Promise.resolve({ error: null })
  }
};
