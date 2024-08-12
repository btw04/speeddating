import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { userSchema } from '../../../utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const user = await User.findOne({ assignedNumber: id });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await User.deleteOne({ assignedNumber: id });
    return NextResponse.json({}, { status: 200 });
}