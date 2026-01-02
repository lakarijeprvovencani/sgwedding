import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET /api/categories - Javni endpoint za dohvatanje kategorija
export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data: categories, error } = await supabase
      .from('categories')
      .select('name')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    return NextResponse.json({ 
      categories: categories.map(c => c.name) 
    });

  } catch (error: any) {
    console.error('Categories fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

