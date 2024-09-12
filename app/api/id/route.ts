import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { userSchema } from '@/utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;
mongoose.connect(MONGO_URI, {dbName: 'speeddating'});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const requestLog: { [key: string]: number} = {};
const RATE_LIMIT = 250;
const RATE_LIMITING = true;

export async function POST(req: NextRequest) {
    let session = req.cookies.get('session')?.value;
    if(!session) {
        return NextResponse.json({ error: 'Unknown session' }, { status: 401 });
    }
    const clientIP = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    const currentTime = Date.now();
    if(requestLog[clientIP] && currentTime - requestLog[clientIP] < RATE_LIMIT && RATE_LIMITING) {
        return NextResponse.json({ error: "Rate limit exceeded. "}, { status: 429})
    }
    requestLog[clientIP] = currentTime;

    let foundUser = await User.findOne({ session });
    const id = foundUser.assignedNumber;

    return NextResponse.json({ ID: id });
}