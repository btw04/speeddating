import ContactForm from '@/components/ContactForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookieStore = cookies();
  if (cookieStore.has('session')) {
    redirect('/contact');
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kontaktdaten</h1>
      <ContactForm/>
    </div>
  );
}
