import { type FC } from "react";
import BookForm from "../components/BookForm";

const NewBookForm: FC = () => {
  return (
    <BookForm title="Xuất bản sách mới" submitBtnTitle="Xuất bản" />
  );
};

export default NewBookForm;