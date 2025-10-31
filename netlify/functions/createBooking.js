import { createClient } from '@supabase/supabase-js'

// Connect to Supabase using your Netlify environment variables
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" }
  }

  try {
    const data = JSON.parse(event.body)
    const { full_name, email, room_type, check_in, check_out } = data

    // Save booking details into Supabase
    const { error } = await supabase
      .from('bookings')
      .insert([{ full_name, email, room_type, check_in, check_out, payment_status: 'pending' }])

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Booking received successfully!" })
    }

  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message })
    }
  }
}

