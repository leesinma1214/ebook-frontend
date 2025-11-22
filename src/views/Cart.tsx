import { type FC } from "react";
import useCart from "../hooks/useCart";

const Cart: FC = () => {
  const { items } = useCart();
  return <div>{JSON.stringify(items)}</div>;
};

export default Cart;
