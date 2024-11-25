import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserServices } from '@/services/user.services';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (!credentials) throw new Error('No credentials');

        const userFound = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password,
        );

        //Verify email
        if (!userFound.user.emailVerified) {
          throw new Error('El correo no ha sido verificado');
        }

        return {
          id: userFound.user.uid,
          email: userFound.user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      const userServices = new UserServices();

      session.user.id = token.id;

      const user = await userServices.getUser(token.id);
      session.user = user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
