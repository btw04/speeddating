import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import FriendForm from '../../components/FriendForm';

export default function ContactPage() {
  const cookieStore = cookies();
  if (!cookieStore.has('assignedNumber')) {
    redirect('/');
  }
  const assignedNumber = cookieStore.get('assignedNumber')?.value;
  if (!assignedNumber) {
    redirect('/');
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Deine ID: 
        <span className="text-blue-600 font-bold ml-2">{assignedNumber}</span>
      </h1>
      <FriendForm id={assignedNumber}/>
    </div>

  );
};

