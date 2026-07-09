import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "khushi-finance-fallback-secret-key-32chars"
);

const COOKIE_NAME = "kf_admin_token";

export interface AdminSession {
  username: string;
  role: string;
}

/**
 * Verify admin credentials against environment variables.
 */
export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "KhushiAdmin@2026";

  return username === adminUsername && password === adminPassword;
}

/**
 * Create a signed JWT token.
 */
export async function signToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token.
 */
export async function verifyToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      username: payload.username as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Get the current admin session from cookies.
 */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

/**
 * Check if the current request is authenticated.
 * Throws an error if not authenticated.
 */
export async function requireAuth(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export { COOKIE_NAME };
