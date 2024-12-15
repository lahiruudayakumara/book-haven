"use client";

import { Archive, ShoppingCart, Trash2 } from "lucide-react";

import CheckoutPopup from "@/components/checkout/checkout-popup";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { useCart } from "@/context";
import { useState } from "react";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <CheckoutPopup
        show={showCheckout}
        onClose={() => {
          setShowCheckout(false);
        }}
      />
      <PageHeader title="Cart" description="This is the cart page" />
      <div className="flex flex-col h-auto items-center w-full py-14 bg-white">
        <div className="w-full lg:w-2/3 h-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 px-2 md:px-0">
            <div className="col-span-2 pr-6">
              {state.items.length > 0 ? (
                <>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border border-l-0 border-r-0">
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px]">
                      {state.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 flex gap-2 font-bold">
                            <Image
                              src={item.img}
                              alt="img"
                              width={100}
                              height={100}
                            />
                            <h3>{item.name}</h3>
                          </td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price * item.quantity}</td>
                          <td>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_ITEM",
                                  payload: item.id,
                                })
                              }
                            >
                              <Trash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h3>Total: ${state.total}</h3>
                  <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
                    Clear Cart
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center md:min-h-[500px] text-gray-200 justify-center space-y-2">
                  <ShoppingCart size={70} />
                  <p className="font-bold">Your cart is empty</p>
                </div>
              )}
            </div>
            <div className="bg-gray-100 md:min-h-[500px] max-h-[500px] flex flex-col p-8 rounded-md">
              <div className="divide-y-2">
                <h1 className="text-xl font-bold">Summary</h1>
                <div className="space-y-2">
                  {state.items.map((item, index) => (
                    <div key={index} className="flex justify-between  text-sm">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>LKR {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  {/* Total Price */}
                </div>
              </div>
              <div className="mt-auto">
                <div className="mt-4 flex justify-between font-semibold py-2 border  border-l-0 border-r-0">
                  <span>Total Price:</span>
                  <span>LKR {state.total}</span>
                </div>

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
  );
}
