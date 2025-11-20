import { type FC } from "react";
import client from "../api/client";
import NewUserForm from "../components/profile/NewUserForm";
import { parseError } from "../utils/helper";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NewUser: FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (formData: FormData) => {
    try {
      await client.put("/auth/profile", formData);
      navigate("/");
    } catch (error) {
      parseError(error);
    }
  };

  if (profile?.signedUp) return <Navigate to="/" />;

  return (
    <NewUserForm
      onSubmit={handleSubmit}
      title="Sắp được rồi! Hãy điền thêm thông tin để hoàn tất hồ sơ của bạn."
      btnTitle="Đăng ký"
    />
  );
};

export default NewUser;
