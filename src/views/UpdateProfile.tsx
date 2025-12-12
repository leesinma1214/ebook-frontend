import { type FC } from "react";
import client from "../api/client";
import NewUserForm from "../components/profile/NewUserForm";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/auth";
import toast from "react-hot-toast";

const UpdateProfile: FC = () => {
  const dispatch = useDispatch();
  const { profile } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    const { data } = await client.put("/auth/profile", formData);
    dispatch(updateProfile(data.profile));
    toast.success("Cập nhật hồ sơ thành công!");
  };

  return (
    <NewUserForm
      name={profile?.name}
      avatar={profile?.avatar}
      title="Cập nhật hồ sơ"
      onSubmit={handleSubmit}
      btnTitle="Cập nhật"
    />
  );
};

export default UpdateProfile;
