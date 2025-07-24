// src/app/api/supabase-test/route.ts
import { supabase } from '../../lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase.from('test_table').select('*')

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
