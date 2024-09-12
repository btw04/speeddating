"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [name, setName] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/submit/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    response.ok ? router.push('/contact') : alert('Fehler beim Einreichen');
    //setSession(data.session);
    //setCookie('session', data.session, { path: '/', maxAge: 60 * 60 * 24 });
  };

  useEffect(() => {
    if (emailInputRef.current) {
      setIsEmailValid(emailInputRef.current.checkValidity() && email === verifyEmail);
    };
  }, [email, verifyEmail]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="eMail (benötigt)"
        required
        className="border p-2 rounded w-full"
        ref={emailInputRef}
      />
      <input
        type="email"
        value={verifyEmail}
        onChange={(e) => setVerifyEmail(e.target.value)}
        placeholder="eMail bestätigen (benötigt)"
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name/Spitzname (optional)"
        className="border p-2 rounded w-full"
      />
      <button 
        type="submit" 
        className={`bg-blue-500 text-white p-2 rounded ${!isEmailValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isEmailValid}
      >
        {isEmailValid ? 'Einreichen' : 'Bitte gültige E-Mail eingeben'}
      </button>
    </form>
  );
};


export default ContactForm;
