import { supabase } from './supabaseClient.ts';

export async function getUserFromToken(token: string) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error) {
    throw new Error('Invalid authentication token');
  }
  
  return user;
}

export function requireAuth(req: Request) {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}