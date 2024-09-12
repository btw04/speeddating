import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { customAlphabet, nanoid } from 'nanoid';
import { userSchema } from '@/utils/MongoSchema';


const alphabet = '0123456789abcdefghijkmnopqrstuvwxyz';
const generateID = customAlphabet(alphabet, 5);
const MONGO_URI = process.env.MONGO_URI as string;
mongoose.connect(MONGO_URI, {dbName: 'speeddating'});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  let assignedNumber = "";
  let isUnique = false;
  
  while (!isUnique) {
    assignedNumber = generateID();
    const existingUser = await User.findOne({ assignedNumber });
    if (!existingUser) {
      isUnique = true;
    }
  }
  const randSession = nanoid();
  const user = name === '' ? new User({ email, assignedNumber, references: [], session: randSession }) : new User({ email, name, assignedNumber, references: [], session: randSession });
  await user.save();

  const response = NextResponse.json({ status: 200 });
  response.cookies.set('session', randSession, { 
    maxAge: 60 * 60 * 24,
    path: '/' 
  });
  return response;
}
