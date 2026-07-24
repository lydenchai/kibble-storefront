"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function loginAction(credentials: any) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error?.message || "Invalid credentials" };
    }

    const data = await res.json();

    const cookieStore = await cookies();
    cookieStore.set("is_authenticated", "true", { path: "/" });

    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      const match = setCookieHeader.match(/storefront_refresh_token=([^;]+)/);
      if (match) {
        cookieStore.set("storefront_refresh_token", match[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        });
      }
    }

    return data;
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to login" };
  }
}

export async function registerAction(data: any) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error?.message || "Failed to register" };
    }

    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to register" };
  }
}

export async function logoutAction() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to logout from backend", error);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete("is_authenticated");
    cookieStore.delete("storefront_refresh_token");
  }
}
