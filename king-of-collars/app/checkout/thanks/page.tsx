import type { Metadata } from "next";
import { Suspense } from "react";
import OrderNumber from "./OrderNumber";
import Link from "next/link";

export const metadata: Metadata = { title: "ההזמנה התקבלה | אלוף הקולרים" };

export default function ThanksPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4" aria-hidden>🎉</div>
      <h1 className="text-2xl font-bold mb-3">ההזמנה התקבלה!</h1>
      <Suspense>
        <OrderNumber />
      </Suspense>
      <p className="text-gray-600 mb-8">
        ניצור איתכם קשר בוואטסאפ בהקדם להשלמת התשלום ותיאום המשלוח. תודה שקניתם אצל אלוף הקולרים 🐾
      </p>
      <Link href="/products/" className="inline-block bg-brand text-white rounded-full px-8 py-3 font-bold">
        המשך לקנות
      </Link>
    </div>
  );
}
