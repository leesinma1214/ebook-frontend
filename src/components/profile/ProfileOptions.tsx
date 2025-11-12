import { Button, Spinner } from "@heroui/react";
import { type FC } from "react";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { type Profile } from "../../store/auth";

interface Props {
  busy?: boolean;
  profile?: Profile | null;
}

const ProfileOptions: FC<Props> = ({ busy, profile }) => {
  if (busy) return <Spinner size="sm" />;

  return profile ? (
    <ProfileMenu profile={profile} />
  ) : (
    <Button as={Link} to="sign-up" variant="bordered">
      Đăng nhập / Đăng ký
    </Button>
  );
};

export default ProfileOptions;
