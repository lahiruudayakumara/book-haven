import { Checkout } from "@/types/checkout";
import ErrorResponse from "@/types/error-response";
import Logger from "@/utils/logger";

const createOrder = async (orderData: Checkout): Promise<Checkout | ErrorResponse> => {
  try {
    if (!orderData) {
      throw new Error("Invalid order data");
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch active offers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    Logger.error("Failed to create order", error);
    return { error: "Failed to create order" };
  }
};

export default createOrder;
