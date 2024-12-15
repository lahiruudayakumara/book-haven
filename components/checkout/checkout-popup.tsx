"use client";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { CreditCard, Truck, X } from "lucide-react";

import Input from "../form/input";
import { useCart } from "@/context";
import { useState } from "react";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CheckoutPopup: React.FC<Props> = ({ show, onClose }) => {
  const { state } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "",
  });
  const [paymentMethod, setPaymentMethod] =
    useState<string>("cash-on-delivery");
  const [cardHolderName, setCardHolderName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () =>
    currentStep < 4 && setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () =>
    currentStep > 1 && setCurrentStep((prev) => prev - 1);

  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    setFormData({
      name: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      paymentMethod: "",
    });
  };

  const elementStyles = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Roboto, sans-serif",
        fontSize: "16px",
        "::placeholder": { color: "#9ca3af" },
      },
      invalid: { color: "#fa755a" },
    },
  };

  const steps = [
    {
      title: "Items in Your Cart",
      content: (
        <div>
          {state.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>LKR {item.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="mt-4 flex justify-between font-semibold py-2 border-t">
            <span>Total Price:</span>
            <span>LKR {state.total}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Checkout Details",
      content: (
        <div className="space-y-4">
          {["name", "email", "address", "city", "phone"].map((field) => (
            <Input
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Choose Payment Method",
      content: (
        <div className="flex gap-2 md:gap-8 justify-center">
          {[
            {
              id: "cash-on-delivery",
              icon: <Truck />,
              label: "Cash on Delivery",
            },
            { id: "card", icon: <CreditCard />, label: "Credit Card" },
          ].map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-md flex flex-col items-center cursor-pointer w-[150px] ${
                paymentMethod === method.id
                  ? "bg-primary text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => setPaymentMethod(method.id)}
              role="button"
              tabIndex={0}
              aria-pressed={paymentMethod === method.id}
            >
              {method.icon}
              <p className="text-sm mt-2">{method.label}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title:
        paymentMethod === "cash-on-delivery"
          ? "Cash on Delivery"
          : "Credit Card Payment",
      content:
        paymentMethod === "cash-on-delivery" ? (
          <p>Your order will be paid upon delivery.</p>
        ) : (
          <form>
            <div className="mb-4">
              <label
                htmlFor="cardHolderName"
                className="block text-sm font-medium"
              >
                Cardholder Name
              </label>
              <input
                id="cardHolderName"
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="John Doe"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Card Number</label>
                <CardNumberElement
                  options={elementStyles}
                  className="border p-2 rounded-md"
                />
              </div>
              <div className="col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    options={elementStyles}
                    className="border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">CVC</label>
                  <CardCvcElement
                    options={elementStyles}
                    className="border p-2 rounded-md"
                  />
                </div>
                <button className="bg-primary w-full h-[36px] mt-auto rounded-md text-white">Pay</button>
              </div>
            </div>
          </form>
        ),
    },
  ];

  return show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <X />
          </button>
        </div>
        <div className="py-6">
          <div className="relative">
            <div className="h-1 bg-slate-100">
              <div
                className="h-1 bg-primary"
                style={{
                  width: `${
                    currentStep === 2
                      ? "35"
                      : currentStep === 3
                      ? "65"
                      : currentStep === 4
                      ? "100"
                      : "0"
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-[-14px]">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    index < currentStep
                      ? "bg-primary text-white"
                      : "bg-slate-200"
                  }`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep - 1].title}
          </h2>
          {steps[currentStep - 1].content}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevStep}
            className="px-4 py-2 rounded-md bg-slate-200"
            disabled={currentStep === 1}
          >
            Prev
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 rounded-md bg-primary text-white"
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CheckoutPopup;
