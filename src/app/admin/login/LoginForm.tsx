"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const next =
    searchParams.get("next") || "/admin";

  const errorType =
    searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "أدخل البريد الإلكتروني وكلمة المرور"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            next,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
      }

      console.log("LOGIN SUCCESS", data);

      router.refresh();
      router.replace(data.next || "/admin");

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تسجيل الدخول"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-4 py-8"
    >
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 text-3xl shadow-lg">
            🦜
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-950">
            نوادر الببغاوات
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            تسجيل الدخول إلى لوحة التحكم
          </p>

        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-zinc-950">
              تسجيل الدخول
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              أدخل بيانات حساب الإدارة للمتابعة.
            </p>

          </div>

          {errorType === "forbidden" && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              هذا الحساب لا يملك صلاحية الوصول إلى لوحة التحكم.
            </div>
          )}

          {errorType === "server" && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              حدث خطأ في إعدادات الخادم.
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-zinc-900"
              >
                البريد الإلكتروني
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-50"
              />

            </div>

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-zinc-900"
              >
                كلمة المرور
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                placeholder="••••••••"
                required
                disabled={loading}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-50"
              />

            </div>

            <button
              type="submit"
              disabled={
                loading ||
                !email.trim() ||
                !password.trim()
              }
              className="h-12 w-full rounded-2xl bg-zinc-950 px-5 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>

          </form>

        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          لوحة إدارة خاصة — الوصول للمستخدمين المصرح لهم فقط
        </p>

      </div>
    </main>
  );
}
