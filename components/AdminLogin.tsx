

import React, { useState } from 'react';
import type firebase from 'firebase/compat/app';

interface AdminLoginProps {
  auth: firebase.auth.Auth;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // onAuthStateChanged in App.tsx will handle the UI update
    } catch (err) {
        const error = err as any;
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setError('Nieprawidłowy e-mail lub hasło.');
                break;
            case 'auth/invalid-email':
                setError('Nieprawidłowy format adresu e-mail.');
                break;
            default:
                setError('Wystąpił błąd logowania. Spróbuj ponownie.');
                break;
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#66FF00]">
                    Panel Administratora
                </span>
            </h1>
            <p className="text-[#F0F0F0]/70 mt-2">Zaloguj się, aby zarządzać stroną.</p>
        </div>
        <div className="bg-[#2A2A2A]/50 p-8 rounded-lg shadow-2xl shadow-black/30 border border-[#32CD32]/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-[#F0F0F0] block mb-2">Adres E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] text-white p-3 rounded-md border border-[#32CD32]/30 focus:border-[#66FF00] focus:ring-2 focus:ring-[#66FF00]/50 outline-none transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold text-[#F0F0F0] block mb-2">Hasło</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] text-white p-3 rounded-md border border-[#32CD32]/30 focus:border-[#66FF00] focus:ring-2 focus:ring-[#66FF00]/50 outline-none transition-all"
                placeholder="••••••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-bold rounded-lg transition-all transform hover:scale-105 hover:brightness-125 shadow-lg shadow-[#FFA500]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logowanie...' : 'Zaloguj'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;