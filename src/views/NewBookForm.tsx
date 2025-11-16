import { type FC } from "react";
import BookForm from "../components/BookForm";
import client from "../api/client";
import axios from "axios";
import toast from "react-hot-toast";

const NewBookForm: FC = () => {
  const handleSubmit = async (data: FormData, file?: File | null) => {
    const res = await client.post("/book/create", data);
    if (res.data && file) {
      axios.put(res.data, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      toast(
        "Sách của bạn đang được xử lý và sẽ sớm xuất bản. Vui lòng kiểm tra trong mục Quản lý sách!",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      title="Xuất bản sách mới"
      submitBtnTitle="Xuất bản"
    />
  );
};

export default NewBookForm;
