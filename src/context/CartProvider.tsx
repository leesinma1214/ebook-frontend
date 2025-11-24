import { type FC, type ReactNode, useEffect, useState } from "react";
import {
  type cartItem,
  type CartItemAPI,
  getCartState,
  updateCartId,
  updateCartItems,
  updateCartState,
} from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import client from "../api/client";
import toast from "react-hot-toast";
import { parseError } from "../utils/helper";
import { CartContext } from "./CartContext";
import { AxiosError } from "axios";

interface CartApiResponse {
  cart: {
    id: string;
    items: CartItemAPI[];
  };
}

interface Props {
  children: ReactNode;
}

const CART_KEY = "cartItems";
const updateCartInLS = (cartItem: cartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItem));
};

let startLSUpdate = false;

const CartProvider: FC<Props> = ({ children }) => {
  const cart = useSelector(getCartState);
  const dispatch = useDispatch();
  const { profile } = useAuth();
  const [pending, setPending] = useState(false);
  const [fetching, setFetching] = useState(true);

  const clearCart = () => {
    // update the UI
    dispatch(updateCartState({ items: [], id: "" }));

    if (profile) {
      // update the server/database
      // if user is authenticated sending api request
      setPending(true);
      client
        .post("/cart/clear")
        .then(() => {
          toast.success("Giỏ hàng đã được làm trống thành công.");
        })
        .catch(parseError)
        .finally(() => {
          setPending(false);
        });
    }
  };

  const updateCart = (item: cartItem) => {
    startLSUpdate = true;
    // update the UI
    dispatch(updateCartItems(item));

    if (profile) {
      // update the server/database
      // if user is authenticated sending api request
      setPending(true);
      client
        .post("/cart", {
          items: [{ product: item.product.id, quantity: item.quantity }],
        })
        .then(({ data }) => {
          toast.success("Sách đã được thêm vào giỏ hàng.");
          dispatch(updateCartId(data.cart));
        })
        .catch(parseError)
        .finally(() => {
          setPending(false);
        });
    }
  };

  useEffect(() => {
    if (startLSUpdate && !profile) {
      updateCartInLS(cart.items);
    }
  }, [cart.items, profile]);

  useEffect(() => {
    const fetchCartInfo = async () => {
      if (!profile) {
        const result = localStorage.getItem(CART_KEY);
        if (result) {
          dispatch(updateCartState({ items: JSON.parse(result) }));
        }

        return setFetching(false);
      }

      try {
        const { data } = await client.get<CartApiResponse>("/cart");
        dispatch(updateCartState({ id: data.cart.id, items: data.cart.items }));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) return;
          parseError(error);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchCartInfo();
  }, [dispatch, profile]);

  return (
    <CartContext.Provider
      value={{
        id: cart.id,
        items: cart.items,
        totalCount: cart.totalCount,
        subTotal: cart.subTotal,
        totalPrice: cart.totalPrice,
        pending,
        fetching,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
