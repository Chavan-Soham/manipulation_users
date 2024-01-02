import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://xkkvhxxtraknjjzftugx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhra3ZoeHh0cmFrbmpqemZ0dWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1ODc5NTMsImV4cCI6MjAxOTE2Mzk1M30.TqhRafK-w7MmRNnSLDt5cJaTbB-OuYZBzjjYeWyrXVE'
)

export default supabase;