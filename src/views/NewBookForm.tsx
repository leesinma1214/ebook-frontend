import { type FC } from "react";
import BookForm from "../components/BookForm";

interface Props {}

const NewBookForm: FC<Props> = () => {
  return (
    <BookForm title="Xuất bản sách mới" submitBtnTitle="Xuất bản" />
  );
};

export default NewBookForm;