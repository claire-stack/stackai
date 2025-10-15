// services/auth.ts
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleJwt(googleJwt: string) {
  const ticket = await client.verifyIdToken({
    idToken: googleJwt,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload?.email) throw new Error("無法取得 email");

  const user = await prisma.user.upsert({
    where: { email: payload.email },
    update: { lastLoginAt: new Date() },
    create: {
      email: payload.email,
      name: payload.name,
    },
  });

  return user;
}

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export function verifyAccessToken(token: string): { userId: string } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
}
