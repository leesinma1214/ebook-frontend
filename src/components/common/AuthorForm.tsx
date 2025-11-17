import { type FC, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RichEditor from "../rich-editor";
import { Button, Input } from "@heroui/react";
import { MdClose, MdOutlineAdd } from "react-icons/md";

interface Props {
  btnTitle?: string;
}

const AuthorForm: FC<Props> = ({ btnTitle }) => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const { profile } = useAuth();

  const addLinkFields = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeLinkField = (index: number) => {
    const oldList = [...socialLinks];
    oldList.splice(index, 1);

    setSocialLinks(oldList);
  };

  return (
    <div className="p-4 space-y-6">
      <p>
        Name: <span className="font-semibold text-lg">{profile?.name}</span>
      </p>

      <RichEditor editable placeholder="Hãy nói cho độc giả biết bạn là ai..." />

      <div className="space-y-4">
        <p className="text-sm font-semibold">Mạng xã hội</p>
        {socialLinks.map((_, index) => {
          return (
            <div className="flex items-center space-x-4">
              <Input placeholder="https://x.com/@something" key={index} />
              {socialLinks.length > 1 && (
                <Button
                  size="sm"
                  onPress={() => removeLinkField(index)}
                  isIconOnly
                >
                  <MdClose />
                </Button>
              )}
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button size="sm" onPress={addLinkFields} isIconOnly>
            <MdOutlineAdd />
          </Button>
        </div>
      </div>

      <Button>{btnTitle}</Button>
    </div>
  );
};

export default AuthorForm;