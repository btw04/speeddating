import Popup from '../components/Popup';
import './globals.css'

export const metadata = {
  title: 'Lerngruppen Speeddating',
  description: 'Workshop für die Informatik OPhase24',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Popup /> 
      </body>
    </html>
  );
}