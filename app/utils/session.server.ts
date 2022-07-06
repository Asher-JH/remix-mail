import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { User } from "@prisma/client";

import { db } from "./db.server";

// Login
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) return null;

  return user;
};

// Register
export const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return db.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  });
};

// Get session secret
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Missing session secret");
}

// Create session storage
const storage = createCookieSessionStorage({
  cookie: {
    name: "remix_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  },
});

// Create user session
export const createUserSession = async (userId: number, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};

// Get user session
export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

// Get logged in user
export const getUser = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "number") {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};

// Logout user & destory session
export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  return redirect("/auth/logout", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};
