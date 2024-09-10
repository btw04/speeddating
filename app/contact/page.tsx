'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import getQuestions from '@/utils/IceBreaker';
import FriendForm from '../../components/FriendForm';

export default function ContactPage() {
  const [assignedNumber, setAssignedNumber] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const cookie = Cookies.get('assignedNumber');
    if (!cookie) {
      window.location.href = '/'; 
    } else {
      setAssignedNumber(cookie);
    }
  }, []);

  useEffect(() => {
    setQuestions(getQuestions(5));
  }, []);

  const handleReturnToData = async () => {
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
        {assignedNumber && <FriendForm id={assignedNumber} />}
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
        onClick={handleReturnToData}
        className="fixed bottom-4 left-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
      >
        Daten löschen
      </button>
    </div>
  );
}
