interface CheckoutItem {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
}

interface CustomerDetails {
    name: string;
    email: string;
    address: string;
    city: string;
    phone: string;
}

export interface Checkout {
    _id?: string;
    items: CheckoutItem[];
    totalAmount: number;
    customerDetails: CustomerDetails;
    paymentId: string;
    orderDate: string;
    readyDate: string;
    shipmentDate: string;
}
