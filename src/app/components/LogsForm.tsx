'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvxzftpjlaizntdndodx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eHpmdHBqbGFpem50ZG5kb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTQ5OTMsImV4cCI6MjA2ODUzMDk5M30.s6sfCHSUGGwH5k0juODePBUvuYu5DMFDyCZZM-_VMMY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LogsForm() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User on load:', user);
      if (user) setUserEmail(user?.email ?? null);
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting log...');

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('Please log in before submitting!');
      setLoading(false);
      return;
    }

    if (!title.trim()) {
      alert('Please enter a movie/show title');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from('watch_logs').insert([
      {
        title: title.trim(),
        user_id: user.id,
      },
    ]);

    console.log('Insert result:', { data, error });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Movie logged successfully!');
      setTitle('');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {userEmail ? (
        <p className="text-green-600 text-center mb-4">Logged in as {userEmail}</p>
      ) : (
        <p className="text-red-600 text-center mb-4">Not logged in</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="movie"
          name="movie"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie or show title"
          className="border p-2 rounded"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Logging...' : 'Log it'}
        </button>
      </form>
    </div>
  );
}
