import { NextRequest, NextResponse } from 'next/server';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { User } from '@/interfaces/User';
import { UserServices } from '@/services/user.services';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, organization } = await request.json();
    const userServices = new UserServices();

    const user = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user.user);

    const newUser: User = {
      id: user.user.uid,
      email: email,
      name: name,
      levelStatus: {},
      points: 0,
      organization: organization,
    };

    await userServices.createUser(newUser);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
