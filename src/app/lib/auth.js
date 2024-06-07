import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/gmail.send",
  "https://mail.google.com"
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: scopes.join(" "),
        },
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      try {
        if (account) {
            console.log(account,"account details")
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.username = account.providerAccountId;
        }
        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        console.log(session,"session")
        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    }
},
   
  
};

export default NextAuth(authOptions);
