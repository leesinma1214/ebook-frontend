import { type FC, useEffect, useState } from "react";
import BookForm, { type InitialBookToUpdate } from "../components/BookForm";
import { useParams } from "react-router-dom";
import client from "../api/client";
import { parseError } from "../utils/helper";
import LoadingSpinner from "../components/common/LoadingSpinner";

const UpdateBookForm: FC = () => {
  const [bookInfo, setBookInfo] = useState<InitialBookToUpdate>();
  const [busy, setBusy] = useState(true);
  const { slug } = useParams();

  console.log(bookInfo);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await client.get(`/book/details/${slug}`);
        setBookInfo(data.book);
      } catch (error) {
        parseError(error);
      } finally {
        setBusy(false);
      }
    };

    fetchBookDetails();
  }, [slug]);

  if (busy) return <LoadingSpinner />;

  return <BookForm title="Cập nhật sách" submitBtnTitle="Cập nhật" />;
};

export default UpdateBookForm;