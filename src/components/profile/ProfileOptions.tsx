import { Button, Spinner } from "@heroui/react";
import { type FC } from "react";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProfileOptions: FC = () => {
  const { profile, status, signOut } = useAuth();
  if (status === "busy") return <Spinner size="sm" />;

  return profile ? (
    <ProfileMenu profile={profile} signOut={signOut} />
  ) : (
    <Button as={Link} to="sign-up" variant="bordered">
      Log In / Sign Up
    </Button>
  );
};

export default ProfileOptions;
