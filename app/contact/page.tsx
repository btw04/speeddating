'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import getQuestions from '@/utils/IceBreaker';
import FriendForm from '../../components/FriendForm';

const NUMBER_OF_QUESTIONS = 4;
const INITIAL_TIME = 5; // in minutes
const MINIMUM_FIRST_TIME = 3; // in minutes
const TIME_TO_SWITCH = 5; // in minutes

export default function ContactPage() {
  const [assignedNumber, setAssignedNumber] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  // check if user has assigned number, if not redirect to home
  useEffect(() => {
    const cookie = Cookies.get('assignedNumber');
    if (!cookie) {
      window.location.href = '/'; 
    } else {
      setAssignedNumber(cookie);
    }
  }, []);

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

  const triggerPopup = () => {
    alert('Zeit den Gesprächspartner zu wechseln!');
  }

  const handleDeleteData = async () => {
    const confirm = window.confirm('Bist du sicher, dass du deine Daten löschen möchtest?');
    if (confirm) {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: assignedNumber })
      });
      Cookies.remove('assignedNumber');
      window.location.href = '/'; 
    }
  };
  

  return (
    <div className="relative flex flex-col min-h-screen container mx-auto p-4 pb-16">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">
          Deine ID: 
          <span className="text-blue-600 font-bold ml-2">{assignedNumber}</span>
        </h1>
        <FriendForm id={assignedNumber} />
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
      </div>
      <button
        onClick={handleDeleteData}
        className="fixed bottom-4 left-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
      >
        Daten löschen
      </button>
    </div>
  );
}
