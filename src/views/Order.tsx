import { type FC, useEffect, useState } from "react";
import client from "../api/client";
import { formatPrice, parseError } from "../utils/helper";
import Skeletons from "../components/skeletons";
import DividerWithTitle from "../components/common/DividerWithTitle";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { Chip, Divider } from "@heroui/react";

interface OrderItem {
  id: string;
  title: string;
  slug: string;
  cover?: string;
  qty: number;
  price: string;
  totalPrice: string;
}

interface Orders {
  id: string;
  stripeCustomerId?: string;
  paymentId?: string;
  totalAmount: string;
  paymentStatus?: string;
  date: string;
  orderItem: OrderItem[];
}

const Orders: FC = () => {
  const [pending, setPending] = useState(true);
  const [orders, setOrders] = useState<Orders[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await client.get("/order");
        setOrders(data.orders);
      } catch (error) {
        parseError(error);
      } finally {
        setPending(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (pending) return <Skeletons.Orders />;

  if (!orders?.length)
    return (
      <div className="p-5 lg:p-0">
        <h1 className="text-xl font-semibold mb-6">Your Orders</h1>
        <div className="text-center pt-10 font-bold text-3xl opacity-60">
          <p>{"You have no orders."}</p>
        </div>
      </div>
    );

  return (
    <div className="p-5 lg:p-0">
      <h1 className="text-xl font-semibold mb-6">Your Orders</h1>
      {orders?.map((order) => {
        return (
          <div key={order.id}>
            <DividerWithTitle title={formatDate(order.date)} />
            {order.orderItem.map((product) => {
              return (
                <div key={product.id}>
                  <div className="flex p-5">
                    <img
                      src={product.cover}
                      alt={product.title}
                      className="w-24 rounded"
                    />

                    <div className="px-5">
                      <Link
                        to={`/book/${product.slug}`}
                        className="text-lg font-bold underline"
                      >
                        {product.title}
                      </Link>

                      <div className="flex items-center space-x-0.5">
                        <p className="font-semibold">
                          {formatPrice(Number(product.price))}
                        </p>
                        <IoCloseOutline />
                        <p>{product.qty} copies</p>
                      </div>

                      <Chip color="danger" radius="sm" className="mt-2">
                        {formatPrice(Number(product.totalPrice))}
                      </Chip>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Divider className="w-10/12" />
                  </div>
                </div>
              );
            })}

            <div className="text-right space-y-1 py-6">
              <p className="font-semibold text-xl">
                Total: {formatPrice(Number(order.totalAmount))}
              </p>
              <p>Payment status: {order.paymentStatus?.toUpperCase()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
