import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIEND_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, account, user, profile }) {
            // Persist the OAuth access_token to the token right after signin
            console.log({
                msg: 'JWT callback result',
                token: token,
                account: account,
                profile: profile
            });
            if (account) {
                token.provider = account.provider;
                switch (account.provider) {
                    case 'google':
                        token.accessToken = account.id_token;
                        break;
                    case 'github':
                        token.accessToken = account.access_token;
                        break;
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            session.provider = token.provider;
            return session;
        }
    }
});
