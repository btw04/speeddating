"use client";

import { useState } from 'react';
import React from 'react';

interface FriendFormProps {
    session: string;
}

const FriendForm: React.FC<FriendFormProps> = ({ session }) => {
    const [friendId, setFriendId] = useState('');
    const [friendMsg, setFriendMsg] = useState('');
    const [notice, setNotice] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/submit/friend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session, friendId, msg: friendMsg }),
        });

        if (response.ok) {
            setNotice({ message: 'ID erfolgreich hinzugefügt', type: 'success' });
            setFriendId('');
            setFriendMsg('');
        } else {
            setNotice({ message: 'Fehler: ID nicht gefunden!', type: 'error' });
        }

        setTimeout(() => {
            setNotice(null);
        }, 2000);
    };

    return (
        <div className="flex flex-col relative">
            <form onSubmit={handleSubmit} className="flex-grow space-y-4">
                <input
                    type="text"
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                    placeholder="ID der anderen Person (benötigt)"
                    required
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    value={friendMsg}
                    onChange={(e) => setFriendMsg(e.target.value)} 
                    placeholder="Nachricht an die andere Person (optional)"
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Hinzufügen
                </button>
            </form>
            {notice && (
                <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg transition-opacity duration-500 opacity-100 ${
                    notice.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                }`}>
                    <p>{notice.message}</p>
                </div>
            )}
        </div>
    );
};

export default FriendForm;
