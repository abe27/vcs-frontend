import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "xpw-project",
      credentials: {},
      async authorize(credentials, req) {
        var formdata = new FormData();
        formdata.append("username", credentials.username);
        formdata.append("password", credentials.password);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        // console.dir(`${process.env.API_HOST}/employee`);
        const res = await fetch(
          `${process.env.API_HOST}/employee`,
          requestOptions
        );

        if (res.ok) {
          const data = await res.json();
          if (data) {
            return data;
          }
        } else {
          console.dir(res);
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: "24h",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // console.dir(user);
        return {
          ...token,
          userId: user.data.data.fcskid,
          userName: user.data.data.fclogin,
          accessToken: `${user.data.jwt_type} ${user.data.jwt_token}`,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.userName = token.userName;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
