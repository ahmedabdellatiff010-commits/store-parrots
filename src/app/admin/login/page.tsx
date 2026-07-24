import { Suspense } from "react";
import LoginForm from "./LoginForm";

function LoginLoading() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-4"
    >
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-950" />

          <p className="mt-4 text-sm text-zinc-500">
            جاري التحميل...
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
