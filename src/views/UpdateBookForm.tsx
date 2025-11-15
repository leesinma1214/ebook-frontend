import { type FC } from "react";
import BookForm from "../components/BookForm";

const UpdateBookForm: FC = () => {
  return <BookForm title="Cập nhật sách" submitBtnTitle="Cập nhật" />;
};

export default UpdateBookForm;