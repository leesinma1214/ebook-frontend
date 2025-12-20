import { type FC } from "react";
import BookForm from "../components/BookForm";
import client from "../api/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewBookForm: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData, file?: File | null) => {
    const res = await client.post<{ fileUploadUrl: string; slug: string }>(
      "/book/create",
      data
    );
    if (res.data && file) {
      axios.put(res.data.fileUploadUrl, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      toast(
        "Your book is being processed and will be published soon. Please check Manage Books for updates.",
        { duration: 5000 }
      );
    }
    navigate("/update-book/" + res.data.slug);
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      title="Publish a new book"
      submitBtnTitle="Publish"
    />
  );
};

export default NewBookForm;
