import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
  useState,
} from "react";
import { Avatar, Button, Input } from "@heroui/react";
import client from "../api/client";
import { parseError } from "../utils/helper";

type NewUserInfo = { name: string; avatar?: File };

const NewUser: FC = () => {
  const [userInfo, setUserInfo] = useState<NewUserInfo>({ name: "" });
  const [localAvatar, setLocalAvatar] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value, files } = target;

    if (name === "name") {
      setUserInfo({ ...userInfo, name: value });
    }

    if (name === "avatar" && files) {
      const file = files[0];
      setUserInfo({ ...userInfo, avatar: file });
      setLocalAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    const formData = new FormData();

    if (userInfo.name.trim().length < 3) {
      return setInvalidForm(true);
    } else {
      setInvalidForm(false);
    }

    formData.append("name", userInfo.name);
    if (userInfo.avatar?.type.startsWith("image")) {
      formData.append("avatar", userInfo.avatar);
    }

    setBusy(true);
    try {
      const { data } = await client.put("/auth/profile", formData);
      console.log(data);
    } catch (error) {
      parseError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-96 border-2 p-5 rounded-md flex flex-col justify-center items-center">
        <h1 className="text-center text-xl font-semibold">
          Sắp được rồi! Cung cấp thêm một số thông tin nữa nhé!
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-6 mt-6">
          <label
            className="cursor-pointer flex justify-center items-center"
            htmlFor="avatar"
          >
            <Avatar
              src={localAvatar}
              isBordered
              radius="sm"
              name={userInfo.name}
            />
            <input
              accept="image/*"
              hidden
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleChange}
            />
          </label>

          <Input
            type="text"
            name="name"
            label="Tên đầy đủ"
            placeholder="John Doe"
            variant="bordered"
            value={userInfo.name}
            onChange={handleChange}
            isInvalid={invalidForm}
            errorMessage="Tên phải có ít nhất 3 ký tự"
          />

          <Button isLoading={busy} type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
