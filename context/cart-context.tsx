"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface CartItem {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "INITIALIZE_CART"; payload: CartState }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "INCREASE_QUANTITY"; payload: string };

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        updatedItems.push(action.payload);
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total: updatedTotal };
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: updatedItems, total: updatedTotal };
    }
    case "CLEAR_CART":
      return initialState;
    case "INITIALIZE_CART":
      return action.payload;
    case "DECREASE_QUANTITY": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      let updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity -= 0.5;
        if (updatedItems[existingItemIndex].quantity <= 0) {
          updatedItems = updatedItems.filter(
            (item) => item.id !== action.payload
          );
        }
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total: updatedTotal };
    }
    case "INCREASE_QUANTITY": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      let updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity += 0.5;
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total: updatedTotal };
    }
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as CartState;
      dispatch({ type: "INITIALIZE_CART", payload: parsedCart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
