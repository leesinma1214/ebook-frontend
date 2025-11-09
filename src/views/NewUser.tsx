import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
  useState,
} from "react";
import { Avatar, Button, Input } from "@heroui/react";

interface Props {}

type NewUserInfo = { name: string; avatar?: File };

const NewUser: FC<Props> = () => {
  const [userInfo, setUserInfo] = useState<NewUserInfo>({ name: "" });
  const [localAvatar, setLocalAvatar] = useState("");

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    console.log(userInfo);
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
          />

          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
