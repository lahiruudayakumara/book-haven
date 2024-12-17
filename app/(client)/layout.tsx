"use client";

import { Elements } from "@stripe/react-stripe-js";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <div className="min-h-full">{children}</div>
      </Elements>
      <Footer />
    </div>
  );
}
