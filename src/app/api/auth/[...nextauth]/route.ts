import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"
//NextAuth function to run the authentication 
//NextAuthOptions to make the properties of the auth (pages, callbacks,sessions,providers)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// get and post methods to read and have data to sign in or up