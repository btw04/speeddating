import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { userSchema } from '../../../../utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;
const alphabet = '0123456789abcdefghijkmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 5);

mongoose.connect(MONGO_URI);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  const assignedNumber = nanoid();
  const user = name === '' ? new User({ email, assignedNumber, references: [] }) : new User({ email, name, assignedNumber, references: [] });
  await user.save();

  return NextResponse.json({ number: assignedNumber });
}
