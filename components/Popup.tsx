"use client";

import { useEffect, useState } from 'react';

const Popup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setVisible(true);
        }    
    }, []);
    
    const handleClose = () => {
        setVisible(false);
        localStorage.setItem('hasSeenPopup', 'true');
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">Willkommen beim Lerngruppen Speeddating!</h2>
            <p>Diese Webseite dient zum Austausch von Kontaktdaten mit möglichen Lernpartnern. </p> <br/>
            <p>Bitte gib hierfür eine eMail als Kontakt an. Diese wird nur für die Dauer des Workshops und der Weitergabe gespeichert und ausschließlich an von dir ausgewählte Personen weitergereicht. Die Verwendung dieser Webseite ist für eine Teilnahme am Workshop nicht zwingend notwendig, wird allerdings empfohlen.  </p>
            <br/>
            <p>Viel Spaß beim Kennenlernen!</p>
            <button onClick={handleClose} className="mt-4 bg-blue-500 text-white p-2 rounded">
              Verstanden
            </button>
          </div>
        </div>
      );

};

export default Popup;