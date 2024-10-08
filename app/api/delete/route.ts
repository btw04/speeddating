import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { userSchema } from '@/utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI, {dbName: 'speeddating'});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
    if(!session) {
        return NextResponse.json({error: 'Unknown session'}, { status: 401 });
    }
    const user = await User.findOne({ session: session });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await User.deleteOne({ session: session });
    return NextResponse.json({}, { status: 200 });
}