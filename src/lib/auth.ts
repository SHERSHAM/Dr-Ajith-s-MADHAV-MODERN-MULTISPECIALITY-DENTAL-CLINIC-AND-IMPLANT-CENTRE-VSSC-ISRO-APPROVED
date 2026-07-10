import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "madhav-dental-clinic-super-secret-key-123456";

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function signToken(payload: UserSessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): UserSessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSessionPayload;
  } catch (error) {
    return null;
  }
}

export function getSession(req: NextRequest): UserSessionPayload | null {
  const tokenCookie = req.cookies.get("portal_session")?.value;
  if (tokenCookie) {
    return verifyToken(tokenCookie);
  }

  const authHeader = req.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return verifyToken(token);
  }

  return null;
}
