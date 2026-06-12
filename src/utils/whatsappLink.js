import { formatCurrency } from "./formatCurrency";

const whatsappNumber = () =>
  (import.meta.env.VITE_WHATSAPP_NUMBER || "2348000000000").replace(/\D/g, "");

export const whatsappLink = (product) => {
  const message = `Hello, I am interested in buying ${product.name} listed at ${formatCurrency(product.price)}.`;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
};

export const whatsappConversationLink = () => {
  const message = "Hello, I need help choosing the right gadget for my budget.";
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
};
