import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { userSchema } from '../../../../utils/MongoSchema';

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI, {dbName: 'speeddating'});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: NextRequest) {
    const { id, friendId, msg } = await req.json();
    const user = await User.findOne({ assignedNumber: id });
    const friend = await User.findOne({ assignedNumber: friendId });
    if (!user || !friend) {
        return NextResponse.json({ error: 'User/Friend not found' }, { status: 404 });
    }
    user.references.push([friendId, msg]);
    await user.save();
    return NextResponse.json({}, { status: 200 });
}