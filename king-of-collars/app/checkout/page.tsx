import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "תשלום ומשלוח | אלוף הקולרים" };

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">תשלום ומשלוח</h1>
      <CheckoutForm />
    </div>
  );
}
