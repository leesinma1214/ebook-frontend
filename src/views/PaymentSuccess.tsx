import { type FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import client from "../api/client";
import { formatPrice, parseError } from "../utils/helper";
import { Divider } from "@heroui/react";
import Skeletons from "../components/skeletons";

interface OrderItem {
  id: string;
  cover?: string;
  price: string;
  qty: number;
  slug: string;
  title: string;
  totalPrice: string;
}

interface Order {
  orders: OrderItem[];
  totalAmount: string;
}

const PaymentSuccess: FC = () => {
  const [busy, setBusy] = useState(true);
  const [order, setOrder] = useState<Order>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const fetchOrderDetail = async () => {
      try {
        const { data } = await client.post("/order/success", { sessionId });
        setOrder(data);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchOrderDetail();
  }, [sessionId]);

    if (busy) return <Skeletons.Payment />;

  return (
    <div className="lg:p-0 p-5">
      <h1 className="font-semibold text-2xl">
        Đơn hàng của bạn đã được thanh toán thành công!
      </h1>
      <div className="p-5 flex flex-col items-center">
        {order?.orders.map((item) => {
          return (
            <div key={item.id} className="w-96">
              <div className="flex">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-28 h-40 rounded object-cover"
                />

                <div className="p-3 flex-1">
                  <Link
                    className="line-clamp-1 font-bold text-lg underline"
                    to={`/book/${item.slug}`}
                  >
                    {item.title}
                  </Link>

                  <p>Giá: {formatPrice(Number(item.price))}</p>
                  <p>Số lượng: {item.qty}</p>
                </div>
              </div>

              <Divider className="my-3" />
            </div>
          );
        })}

        <div className="w-96 flex items-center justify-between">
          <p className="font-bold">Tổng cộng:</p>
          <p className="font-bold">{formatPrice(Number(order?.totalAmount))}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
