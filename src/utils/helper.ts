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