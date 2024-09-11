import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { customAlphabet, nanoid } from 'nanoid';
import { userSchema } from '@/utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;
mongoose.connect(MONGO_URI, {dbName: 'speeddating'});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const requestLog: { [key: string]: number} = {};
const RATE_LIMIT = 250;

export async function POST(req: NextRequest) {
    const { session } = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    const currentTime = Date.now();
    //if(requestLog[clientIP] && currentTime - requestLog[clientIP] < RATE_LIMIT) {
    //    return NextResponse.json({ error: "Rate limit exceeded. "}, { status: 429})
    //}
    requestLog[clientIP] = currentTime;

    let foundUser = await User.findOne({ session });
    const id = foundUser.assignedNumber;

    return NextResponse.json({ ID: id });
}