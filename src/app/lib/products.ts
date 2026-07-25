export {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
} from "./products.server";

export const WHATSAPP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";