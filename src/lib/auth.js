import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("Missing DB_URI environment variable");
}

const client = new MongoClient(process.env.DB_URI);
const db = client.db("medi-queue-tutor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
});