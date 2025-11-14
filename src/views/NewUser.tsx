import { type FC } from "react";
import client from "../api/client";
import NewUserForm from "../components/profile/NewUserForm";

const NewUser: FC = () => {
  const handleSubmit = async (formData: FormData) => {
    await client.put("/auth/profile", formData);
  };

  return (
    <NewUserForm
      onSubmit={handleSubmit}
      title="Sắp được rồi! Hãy điền thêm thông tin để hoàn tất hồ sơ của bạn."
      btnTitle="Đăng ký"
    />
  );
};

export default NewUser;
