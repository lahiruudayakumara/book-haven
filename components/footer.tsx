"use client";

import Image from "next/image";
import Link from "next/link";
import { ScreenContainer } from "./screen-container";
import { Send } from "lucide-react";
import postSubscribe from "@/lib/api-requests/subscribe/post-subscribe";
import { useState } from "react";
import { useToast } from "./toast-provider";

export default function Footer() {
  const { addToast } = useToast();

  const [email, setEmail] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    // setErrorMessage(null);
    // setSuccessMessage(null);

    const response = await postSubscribe(email);

    setEmail("");
    
    if (response?.error) {
      addToast(response.error, "error");
    } else {
      addToast("Subscribed Successfully", "success");
    }
    // setIsLoading(false);
  };

  return (
    <div>
      <footer className="bg-white dark:bg-gray-800 py-4 divide-y-2 shadow-inner">
        <ScreenContainer>
          <div className="grid md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 my-4">
            <div className="p-4">
              <h1 className="text-primary font-bold">Support</h1>
              <p className="dark:text-white">support@domain.com</p>
            </div>
            <div className="p-4">
              <h1 className="text-primary font-bold">Policies</h1>
              <p className="dark:text-white">Privacy And Cookie Policy</p>
              <p className="dark:text-white">Data Deletion Request</p>
              <p className="dark:text-white">Terms and Conditions</p>
            </div>
            <div className="p-4 divide-y-2 dark:text-white">
              <div className="mb-4">
                <Image src="/logo.png" width={250} height={100} alt="logo" />
                <p>New Kandy Road, Battaramulla</p>
                <p>+94 (123) 456-7891</p>
                <p>example@domain.com</p>
              </div>
              <div className="space-y-2">
                <p className="mt-4">
                  Subscribe & get discount coupons and offers.
                </p>
                <div className="bg-slate-200 flex rounded-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none py-2 px-3 rounded-r-md text-black"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-primary rounded-r-md text-white p-2"
                  >
                    <Send />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScreenContainer>
        <p className="pt-2 text-center dark:text-white">
          &copy; 2022{" "}
          <Link className="text-primary" href="https://lahiruudayakumara.me">
            LAHIRU UDAYAKUMARA
          </Link>
        </p>
      </footer>
    </div>
  );
}
