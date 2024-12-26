import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "../../../../libs/mysql"; // Ajusta la ruta según tu estructura de carpetas

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await query("SELECT * FROM users WHERE username = ?", [
          credentials.username,
        ]);

        if (user.length > 0) {
          const isValid = bcrypt.compareSync(
            credentials.password,
            user[0].password
          );
          if (isValid) {
            return { id: user[0].id, name: user[0].username };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
