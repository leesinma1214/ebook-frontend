import { type FC } from "react";
import BookForm from "../components/BookForm";

interface Props {}

const UpdateBookForm: FC<Props> = () => {
  return <BookForm title="Cập nhật sách" submitBtnTitle="Cập nhật" />;
};

export default UpdateBookForm;