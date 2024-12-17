"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import CheckoutPopup from "@/components/checkout/checkout-popup";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/context";
import { useState } from "react";

interface Items {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  return (
    <div>
      <CheckoutPopup
        show={showCheckout}
        onClose={() => {
          setShowCheckout(false);
        }}
      />
      <PageHeader title="Cart" description="This is the cart page" />
      <div className="flex flex-col h-auto items-center w-full py-14 ">
        <div className="w-full lg:w-2/3 h-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 px-2 md:px-0">
            <div className="col-span-2 pr-6">
              {state.items.length > 0 ? (
                <>
                  <div className="w-full dark:text-slate-200">
                    <div className="flex justify-start items-center px-4 py-2 border-b font-bold">
                      <span className="w-1/2">Item</span>
                      <span className="w-1/4 text-center">Quantity</span>
                      <span className="w-1/4 text-right">Price</span>
                    </div>

                    <div className="divide-y">
                      {state.items.map((item: Items) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 px-4"
                        >
                          <div className="flex flex-col md:flex-row items-center gap-4 w-1/2">
                            <Image
                              src={item.img}
                              alt="img"
                              width={100}
                              height={100}
                              className="rounded-md"
                            />
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p>
                                {" "}
                                LKR{" "}
                                {new Intl.NumberFormat("en-LK", {
                                  style: "currency",
                                  currency: "LKR",
                                  minimumFractionDigits: 0,
                                })
                                  .format(item.price)
                                  .replace("LKR", "")
                                  .trim()}
                              </p>
                            </div>
                          </div>

                          <div className="w-1/4 flex flex-col md:flex-row dark:text-gray-900 justify-center items-center gap-2">
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "DECREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="font-bold dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "INCREASE_QUANTITY",
                                  payload: item.id,
                                })
                              }
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          {/* Price and Remove Button */}
                          <div className="flex items-center justify-between w-2/4 md:1/4">
                            <span>
                              LKR{" "}
                              {new Intl.NumberFormat("en-LK", {
                                style: "currency",
                                currency: "LKR",
                                minimumFractionDigits: 0,
                              })
                                .format(item.price * item.quantity)
                                .replace("LKR", "")
                                .trim()}
                            </span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_ITEM",
                                  payload: item.id,
                                })
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center md:min-h-[500px] text-gray-200 justify-center space-y-2">
                  <ShoppingCart size={70} />
                  <p className="font-bold">Your cart is empty</p>
                </div>
              )}
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 md:min-h-[500px] max-h-[500px] flex flex-col p-8 rounded-md">
              <div className="divide-y-2">
                <h1 className="text-xl font-bold dark:text-primary">Summary</h1>
                <div className="space-y-2 dark:text-slate-200">
                  {state.items.map((item, index) => (
                    <div key={index} className="flex justify-between  text-sm">
                      <span>
                        {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name} (x{item.quantity})
                      </span>
                      <span>LKR {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  {/* Total Price */}
                </div>
              </div>
              <div className="mt-auto dark:text-slate-200">
                <div className="mt-4 flex justify-between font-semibold py-2 border  border-l-0 border-r-0">
                  <span>Total Price:</span>
                  <span>LKR {state.total.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="bg-gray-800 mt-4 w-1/3 text-white p-3 rounded-md dark:bg-slate-200 dark:text-black"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className=" bg-primary mt-4 w-full text-white p-3 rounded-md"
                  >
                    PROCCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
