import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getUserFromToken(token?: string) {
  if (!token) {
    return null;
  }

  if (!supabaseAdmin) {
    console.error("Supabase admin client is not configured");
    return null;
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      console.error(
        "Invalid Supabase access token:",
        userError?.message
      );

      return null;
    }

    const {
      data: admin,
      error: adminError,
    } = await supabaseAdmin
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error(
        "Admin permission check failed:",
        adminError.message
      );

      return null;
    }

    if (!admin) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(
      "getUserFromToken error:",
      error
    );

    return null;
  }
}

export function validateRedirect(
  next: string | null | undefined
) {
  if (!next) {
    return "/admin";
  }

  if (!next.startsWith("/")) {
    return "/admin";
  }

  if (next.startsWith("//")) {
    return "/admin";
  }

  if (next.includes("://")) {
    return "/admin";
  }

  return next;
}
