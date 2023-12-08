import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jkdcjxhjkgjdxwjhqsiq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZGNqeGhqa2dqZHh3amhxc2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyOTgxOTQsImV4cCI6MjAxNjg3NDE5NH0.hqopHHIpDAuFGEX-qCXuUbXyFO4wVymgx7rQPBKjMU0'
);

export default supabase;
