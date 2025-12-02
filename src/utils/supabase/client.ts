import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client for the browser
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseClient) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseClient = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}

// Database types based on our schema
export interface Voter {
  id: string;
  aadhaar_number: string;
  phone_number: string;
  has_voted: boolean;
  session_status: boolean;
  receipt_id: string | null;
  created_at: string;
}

export interface Election {
  id: string;
  name: string;
  constituency: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

export interface Candidate {
  id: string;
  election_id: string;
  name: string;
  party: string;
  symbol: string;
  description: string;
  created_at: string;
}

export interface VoteRecord {
  id: string;
  voter_id: string;
  election_id: string;
  candidate_id: string;
  timestamp: string;
}

export interface Result {
  id: string;
  election_id: string;
  candidate_id: string;
  vote_count: number;
  updated_at: string;
}
