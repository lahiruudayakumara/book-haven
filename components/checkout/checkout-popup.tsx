"use client";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Checkout } from "@/types/checkout";
import ErrorResponse from "@/types/error-response";
import Input from "../form/input";
import Logger from "@/utils/logger";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { X } from "lucide-react";
import createOrder from "@/lib/api-requests/checkout/post-checkout";
import { createPaymentIntent } from "@/lib/api-requests/stripe/post-stripe";
import { useCart } from "@/context";
import { useState } from "react";
import { useToast } from "../toast-provider";

interface Props {
  show: boolean;
  onClose: () => void;
}

const CheckoutPopup: React.FC<Props> = ({ show, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { addToast } = useToast();
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

  const createOrderItems = async (payId: string): Promise<Checkout | ErrorResponse> => {
    try {
      const response = createOrder({
        items: state.items.map((item) => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: state.total,
        customerDetails: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        },
        paymentId: payId,
        orderDate: new Date().toDateString(),
        readyDate: "1-2 days",
        shipmentDate: "3-5 days",
      });

      if ("error" in response) {
        // setShowUpdateErrorModal(true);
        return { error: "Error creating order" };
      } else {
        return response;
      }
    } catch (error) {
      Logger.error("Error:", error);
      return { error: "Error creating order" };
    }
  };

  const handlerPayment = async () => {
    try {
      if (!stripe || !elements) return;

      const paymentIntentResponse = await createPaymentIntent(state.total);
      if ("error" in paymentIntentResponse) {
        throw new Error(paymentIntentResponse.error);
      }
      const { clientSecret } = paymentIntentResponse;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(
            CardNumberElement
          ) as StripeCardNumberElement,
          billing_details: {
            name: cardHolderName,
          },
        },
      });

      if (paymentResult.error) {
        addToast(`Payment failed: ${paymentResult.error.message}`, "error");
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        createOrderItems(paymentResult.paymentIntent.id).then((response) => {
          if (!('error' in response)) {
            setCurrentStep(4);
          }
        });
      }
    } catch (error) {
      Logger.error("Error:", error);
      addToast("An error occurred while processing the payment.", "error");
    }
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
        <div className="dark:text-slate-200">
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
            <span>LKR {state.total.toLocaleString()}</span>
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
      title: "Credit Card Payment",
      content: (
        <div>
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
                <label className="block text-sm font-medium">Expiry Date</label>
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
            </div>
          </div>
          <div className="mt-4 flex justify-between font-semibold py-2 border-t">
            <span>Total Price:</span>
            <span>LKR {state.total.toLocaleString()}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Your Paymet Suceessfully Done",
      content: (
        <div className="flex gap-2 md:gap-8 justify-center">
          <p className="text-sm text-center dark:text-slate-200">
            Your payment has been successfully processed. You will receive an
            email confirmation shortly.
          </p>
        </div>
      ),
    },
  ];

  return show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold dark:text-slate-200">
            Checkout
          </h1>
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
          <h2
            className={`font-semibold mb-4 dark:text-slate-200 ${
              currentStep === 4 ? "text-center" : "text-xl"
            }`}
          >
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
            onClick={() => {
              if (currentStep === 3) {
                handlerPayment();
              } else {
                handleNextStep();
              }
              if (currentStep === 4) {
                onClose();
              }
            }}
            className="px-4 py-2 rounded-md bg-primary text-white"
            disabled={
              currentStep === steps.length || currentStep === 2
                ? !formData.name ||
                  !formData.address ||
                  !formData.city ||
                  !formData.phone ||
                  !formData.email  : false ||
                  currentStep === 3
                  ? !cardHolderName
                  : false
            }
          >
            {currentStep === steps.length
              ? "Finish"
              : currentStep === 3
              ? "Pay"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CheckoutPopup;
