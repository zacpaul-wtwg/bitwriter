// src/pages/api/someApiEndpoint.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }


    return new Response(JSON.stringify({ data }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error fetching user:', error);

    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: error.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
