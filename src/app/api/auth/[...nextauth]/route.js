import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            await connectDB();
            const userFound = await User.findOne({email: credentials?.email}).select("+password")
            if(!userFound) throw new Error ("Credenciales invalidas")

            const passwordMatch = await bcrypt.compare(credentials?.password, userFound.password)
            if(!passwordMatch) throw new Error("Contraseña incorrecta")
            return userFound;
          }
    })
],
callbacks: {
    jwt({account,token,user,profile,session}){
        if (user) token.user = user;
        console.log(token)
        return token;
    },
    session({session,token}){
        session.user = token.user;
        return session;
    }
},
secret: process.env.JWT_SECRET,
pages: {
    signIn: "/login"
}
})

export { handler as GET, handler as POST }