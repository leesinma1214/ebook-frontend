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
    toast.success("Profile updated successfully!");
  };

  return (
    <NewUserForm
      name={profile?.name}
      avatar={profile?.avatar}
      title="Update Profile"
      onSubmit={handleSubmit}
      btnTitle="Update"
    />
  );
};

export default UpdateProfile;
