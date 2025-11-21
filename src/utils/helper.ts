import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiError {
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export const parseError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError;
    if (data.errors) {
      // it means this is an array of objects with error
      const messages = Object.values(data.errors).flat();
      return messages.map((msg) => {
        toast(msg, { position: "top-right" });
      });
    }

    if (data.error) {
      // it means this is an error message: string
      return toast(data.error, { position: "top-right" });
    }

    if (data.message) {
      // it means this is an error message: string
      return toast(data.message, { position: "top-right" });
    }
  }

  if (error instanceof Error) {
    return toast(error.message, { position: "top-right" });
  }

  toast("Ui, có lỗi xảy ra rồi, bạn thử lại sau nhé!", {
    position: "top-right",
  });
};

export const calculateDiscount = (price: { mrp: string; sale: string }) => {
  const { mrp, sale } = price;

  const mrpNumber = Number(mrp);
  const saleNumber = Number(sale);

  return Math.round(((mrpNumber - saleNumber) / mrpNumber) * 100);
};

export const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
};