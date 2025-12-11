// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

// These values should be set in your .env file
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://wtgwxnhnqdnbzpetltrt.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export individual functions for easier use
export const auth = supabase.auth
export const from = supabase.from
export const functions = supabase.functions
export const storage = supabase.storage

// Helper function to call Edge Functions
export async function callFunction(functionName, payload = {}) {
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload
    })
    
    if (error) {
      console.error(`Error calling function ${functionName}:`, error)
      throw error
    }
    
    return data
  } catch (error) {
    console.error(`Network error calling function ${functionName}:`, error)
    throw error
  }
}

// Helper function to handle authentication state changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to sign up
export async function signUp(email, password, userData = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  
  if (error) throw error
  return data
}

// Helper function to sign in
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Helper function to get user profile
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
    
  if (error) throw error
  return data
}

// Helper function to update user profile
export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    
  if (error) throw error
  return data
}