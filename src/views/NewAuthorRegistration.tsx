import { type FC } from "react";
import AuthorForm, { type AuthorInfo } from "../components/common/AuthorForm";
import client from "../api/client";

const NewAuthorRegistration: FC = () => {
  const handleSubmit = async (data: AuthorInfo) => {
    const res = await client.post("/author/register", data);
    console.log(res.data);
  };

  return <AuthorForm onSubmit={handleSubmit} btnTitle="Trở thành Tác Giả" />;
};

export default NewAuthorRegistration;