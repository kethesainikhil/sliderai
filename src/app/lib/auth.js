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
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      try {
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.username = account.providerAccountId;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;

        }
        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    }
},
   
  
};

export default NextAuth(authOptions);
