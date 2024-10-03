import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'John Doe' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.username !== '' && credentials?.password !== '') {
          return { id: '1', name: credentials?.username };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
