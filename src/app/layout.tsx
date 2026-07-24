import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "نوادر الببغاوات | متجر ببغاوات فاخر",
    template: "%s | نوادر الببغاوات",
  },
  description:
    "متجر نوادر الببغاوات يقدم تشكيلة مختارة من الببغاوات المميزة مع خدمة طلب مباشرة عبر واتساب.",
  keywords: [
    "ببغاوات",
    "ببغاوات للبيع",
    "متجر طيور",
    "ببغاوات مصر",
    "طلب ببغاء عبر واتساب",
    "نوادر الببغاوات",
  ],
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "نوادر الببغاوات | متجر ببغاوات فاخر",
    description:
      "اكتشف تشكيلة مختارة من الببغاوات المميزة واحصل على دعم مباشر عبر واتساب.",
    locale: "ar_EG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}