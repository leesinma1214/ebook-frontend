import { type FC, useEffect ,useState } from "react";
import useAuth from "../../hooks/useAuth";
import RichEditor from "../rich-editor";
import { Button, Input } from "@heroui/react";
import { MdClose, MdOutlineAdd } from "react-icons/md";
import { z } from "zod";
import ErrorList from "./ErrorList";
import { parseError } from "../../utils/helper";

export interface AuthorInfo {
  name: string;
  about: string;
  socialLinks?: string[];
}

export interface InitialState extends AuthorInfo {
  id: string;
}

interface Props {
  btnTitle?: string;
  onSubmit(data: AuthorInfo): Promise<void>;
  initialState?: InitialState;
}

const newAuthorSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Điền tên của bạn!" : "Tên không hợp lệ!",
    })
    .trim()
    .min(3, "Tên không hợp lệ!"),
  about: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Hãy nói cho độc giả biết bạn là ai..."
          : "Thông tin không hợp lệ!",
    })
    .trim()
    .min(100, "Hãy viết ít nhất 100 ký tự về bản thân bạn!"),
  socialLinks: z
    .array(
      z.url({
        message:
          "Các liên kết mạng xã hội chỉ có thể là danh sách các URL hợp lệ!",
      })
    )
    .optional(),
});

const AuthorForm: FC<Props> = ({ initialState, btnTitle, onSubmit }) => {
  const [socialLinks, setSocialLinks] = useState([""]);
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>();
  const { profile } = useAuth();

  const addLinkFields = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const removeLinkField = (index: number) => {
    const oldList = [...socialLinks];
    oldList.splice(index, 1);

    setSocialLinks(oldList);
  };

  const updateSocialLinks = (index: number, value: string) => {
    const oldList = [...socialLinks];
    oldList[index] = value;
    setSocialLinks(oldList);
  };

  const handleSubmit = async () => {
    try {
      const links: string[] = [];

      socialLinks.forEach((link) => {
        if (link.trim()) links.push(link);
      });

      const data = {
        name: profile?.name,
        about,
        socialLinks: links,
      };

      const result = newAuthorSchema.safeParse(data);
      if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path.join(".") || "general";
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        });
        return setErrors(fieldErrors);
      }

      // Clear errors and submit the data
      setErrors({});
      await onSubmit(result.data);
    } catch (error) {
      parseError(error);
    }
  };

  useEffect(() => {
    if (initialState) {
      setAbout(initialState.about);
      let links = [""];

      if (initialState.socialLinks?.length) {
        links = initialState.socialLinks;
      }

      setSocialLinks(links);
    }
  }, [initialState]);

  return (
    <div className="p-4 space-y-6">
      <p>
        Name: <span className="font-semibold text-lg">{profile?.name}</span>
      </p>

      <RichEditor
        onChange={setAbout}
        value={about}
        editable
        placeholder="Hãy nói cho độc giả biết bạn là ai..."
        isInvalid={errors?.about ? true : false}
        errorMessage={<ErrorList errors={errors?.about} />}
      />

      <div className="space-y-4">
        <p className="text-sm font-semibold">Mạng xã hội</p>

        <ErrorList errors={errors?.socialLinks} />

        {socialLinks.map((_, index) => {
          return (
            <div key={index} className="flex items-center space-x-4">
              <Input
                onChange={({ target }) =>
                  updateSocialLinks(index, target.value)
                }
                value={socialLinks[index]}
                placeholder="https://x.com/@something"
              />
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

      <Button onPress={handleSubmit}>{btnTitle}</Button>
    </div>
  );
};

export default AuthorForm;
