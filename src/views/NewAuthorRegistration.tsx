import { type FC } from "react";
import AuthorForm, { type AuthorInfo } from "../components/common/AuthorForm";
import client from "../api/client";
import toast from "react-hot-toast";

const NewAuthorRegistration: FC = () => {
  const handleSubmit = async (data: AuthorInfo) => {
    const res = await client.post("/author/register", data);
    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return <AuthorForm onSubmit={handleSubmit} btnTitle="Trở thành Tác Giả" />;
};

export default NewAuthorRegistration;