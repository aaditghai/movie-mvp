'use client';
import { useState } from 'react';
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvxzftpjlaizntdndodx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eHpmdHBqbGFpem50ZG5kb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTQ5OTMsImV4cCI6MjA2ODUzMDk5M30.s6sfCHSUGGwH5k0juODePBUvuYu5DMFDyCZZM-_VMMY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

  
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Check your email for the login link!');
  };

  return (
    <form onSubmit={handleLogin} className="space-y-2 max-w-sm mx-auto p-4">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
