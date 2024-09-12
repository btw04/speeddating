'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import getQuestions from '@/utils/IceBreaker';
import FriendForm from '@/components/FriendForm';


const NUMBER_OF_QUESTIONS = 4;
const INITIAL_TIME = 5; // in minutes
const MINIMUM_FIRST_TIME = 3; // in minutes
const TIME_TO_SWITCH = 5; // in minutes

interface Friend {
  id: string;
  message: string | null;
}

export default function ContactPage() {
  const [ID, setID] = useState<string | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);

  // check if user has assigned number, if not redirect to home
  useEffect(() => {
    const cookie = Cookies.get('session');
    if (!cookie) {
      window.location.href = '/'; 
    } else if (!ID) {
      setSession(cookie);
      getID(cookie);
    }
  }, [ID]);

  // load random questions 
  useEffect(() => {
    setQuestions(getQuestions(NUMBER_OF_QUESTIONS));
  }, []);

  // synchronize time on first load to next occurence of INITIAL_TIME
  useEffect(() => {
    const now = new Date();
    let timeUntilNextPopup = ((INITIAL_TIME - (now.getMinutes() % INITIAL_TIME)) * 60 * 1000) - (now.getSeconds() * 1000);
    if(timeUntilNextPopup < MINIMUM_FIRST_TIME * 60 * 1000) {
      timeUntilNextPopup += TIME_TO_SWITCH * 60 * 1000;
    }

    const timeoutId = setTimeout(() => {
      triggerPopup();
      const intervalId = setInterval(triggerPopup, TIME_TO_SWITCH * 60 * 1000);
      return () => clearInterval(intervalId);
    }, timeUntilNextPopup);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchFriends();
  }, []);

  async function getID(session: string) {
    const response = await fetch("/api/id", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    });
    const data = await response.json();
    setID(data.ID);
  }

  const fetchFriends = async () => {
    const response = await fetch('/api/friends', {
      method: 'GET'
    });
    if (response.ok) {
      const data = await response.json();
      setFriends(data.friends.map((friend: [string, string]) => ({ id: friend[0], message: friend[1] })));
    }
  };


  const triggerPopup = () => {
    alert('Zeit den Gesprächspartner zu wechseln!');
  }

  const handleDeleteFriend = async (friendId: string) => {
    const response = await fetch('/api/delete/friend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendId }),
    });

    if (response.ok) {
      alert('ID erfolgreich gelöscht');
    } else {
      alert('Fehler beim Löschen der ID');
    }

    fetchFriends();
  };

  const handleDeleteAllData = async () => {
    const confirm = window.confirm('Achtung! Bist du sicher, dass du ALLE deine Daten löschen möchtest? Dies kann nicht rückgängig gemacht werden und du wirst nicht per E-Mail über Kontakte benachrichtigt.');
    if (confirm) {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        Cookies.remove('session');
        window.location.href = '/';
      } else {
        alert('Fehler beim Löschen der Daten');
      }
    }
  };
  

  return (
    <div className="relative flex flex-col min-h-screen container mx-auto p-4 pb-16">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">
          Deine ID:
          <span className="text-blue-600 font-bold ml-2">{ID}</span>
        </h1>
        <FriendForm onSubmission={fetchFriends} />
        <Accordion isCompact>
          <AccordionItem key="1" aria-label="Accordion 1" title={
            <div className="text-lg font-bold py-5 text-left">
              Eisbrecher
            </div>
          }>
            <ul className="flex flex-wrap gap-4">
              {questions.map((question, index) => (
                <li key={index} className="inline-block border border-gray-300 rounded-lg p-2 bg-gray-100">
                  {question}
                </li>
              ))}
            </ul>
          </AccordionItem>
        </Accordion>
        <div className="accordion-container">
      <Accordion isCompact>
        <AccordionItem
          key="friend-list"
          title={
            <div className="text-lg font-bold py-5 text-left">
              Hinzugefügte IDs
            </div>
          }
          aria-label="Hinzugefügte IDs"
        >
          <ul className="flex flex-col gap-4 p-2">
            {friends.map((friend, index) => (
              <li key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-100">
                <p><strong>ID:</strong> {friend.id}</p>
                <p><strong>Nachricht:</strong> {friend.message}</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  onClick={() => handleDeleteFriend(friend.id)}
                >
                  Löschen
                </button>
              </li>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
      </div>
      <button
        onClick={handleDeleteAllData}
        className="fixed bottom-4 left-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
      >
        Alle Daten löschen
      </button>
    </div>
  );
}