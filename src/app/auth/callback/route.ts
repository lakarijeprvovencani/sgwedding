import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /auth/callback
// Handles email verification AND password reset callbacks from Supabase
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const type = searchParams.get('type'); // 'recovery' for password reset

  if (code) {
    const supabase = await createClient();
    
    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Proveri da li je ovo password reset
      if (type === 'recovery') {
        // Redirect na stranicu za novu lozinku
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }
      
      // Uspešna verifikacija emaila - redirect na dashboard
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Greška - redirect na error stranicu
  return NextResponse.redirect(`${origin}/auth/error?message=verification_failed`);
}
