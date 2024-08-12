"use client";

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/accordion";

import getQuestions from '@/utils/IceBreaker';
import FriendForm from '../../components/FriendForm';


export default function ContactPage() {
  const [assignedNumber, setAssignedNumber] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const cookie = Cookies.get('assignedNumber');
    if (!cookie) {
      redirect('/');
    }
    setAssignedNumber(cookie);
  }, []);

  useEffect(() => {
    setQuestions(getQuestions(5));
  }, []);

  const defCont = "hi";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Deine ID: 
        <span className="text-blue-600 font-bold ml-2">{assignedNumber}</span>
      </h1>
      <FriendForm id={assignedNumber}/>
      <Accordion isCompact>
        <AccordionItem key="1" aria-label="Accordion 1" title={
          <div className="text-lg font-bold py-5">
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
  );
};

