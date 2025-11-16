import { type FC } from "react";
import BookForm from "../components/BookForm";
import client from "../api/client";

const NewBookForm: FC = () => {
  const handleSubmit = async (data: FormData) => {
    const res = await client.post("/book/create", data);
    console.log(res.data);
  };

  return (
    <BookForm onSubmit={handleSubmit} title="Xuất bản sách mới" submitBtnTitle="Xuất bản" />
  );
};

export default NewBookForm;