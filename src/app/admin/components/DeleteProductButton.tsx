"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
  productName: string;
};

export default function DeleteProductButton({
  productId,
  productName,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف المنتج "${productName}"؟\n\nلا يمكن التراجع عن هذا الإجراء.`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "فشل حذف المنتج"
        );
      }

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء حذف المنتج"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "جاري الحذف..." : "حذف"}
    </button>
  );
}
