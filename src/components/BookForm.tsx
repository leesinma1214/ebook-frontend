import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
} from "@heroui/react";
import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
  useState,
} from "react";
import { genreList, genres, languageList, languages } from "../utils/data";
import PosterSelector from "./PosterSelector";
import RichEditor from "./rich-editor";
import { parseDate } from "@internationalized/date";
import { z } from "zod";
import ErrorList from "./common/ErrorList";
import clsx from "clsx";
import { parseError } from "../utils/helper";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
  onSubmit(formData: FormData): Promise<void>;
}

interface DefaultForm {
  file?: File;
  cover?: File;
  title: string;
  description: string;
  publicationName: string;
  publishedAt?: string;
  genre: string;
  language: string;
  mrp: string;
  sale: string;
}

const defaultBookInfo = {
  title: "",
  description: "",
  language: "",
  genre: "",
  mrp: "",
  publicationName: "",
  sale: "",
};

interface BookToSubmit {
  title: string;
  description: string;
  uploadMethod: "aws" | "local";
  language: string;
  publishedAt?: string;
  publicationName: string;
  genre: string;
  price: {
    mrp: number;
    sale: number;
  };
  fileInfo: {
    type: string;
    name: string;
    size: number;
  };
}

const commonBookSchema = {
  title: z.string().trim().min(5, "Tiêu đề quá ngắn!"),
  description: z.string().trim().min(5, "Mô tả quá ngắn!"),
  genre: z.enum(genreList, { message: "Vui lòng chọn thể loại!" }),
  language: z.enum(languageList, { message: "Vui lòng chọn ngôn ngữ!" }),
  publicationName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Tên nhà xuất bản không hợp lệ!"
          : "Không phải chuỗi ký tự",
    })
    .trim()
    .min(3, "Tên nhà xuất bản quá ngắn!"),
  uploadMethod: z.enum(["aws", "local"], {
    message: "Phương thức tải lên bị thiếu!",
  }),
  publishedAt: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Ngày xuất bản bị thiếu!"
          : "Không phải chuỗi ký tự",
    })
    .trim(),
  price: z
    .object({
      mrp: z
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Giá bán tối thiểu bị thiếu!"
              : "Không phải số",
        })
        .refine((val) => val > 0, "Giá bán tối thiểu bị thiếu!"),
      sale: z
        .number({
          error: (issue) =>
            issue.input === undefined ? "Giá bán bị thiếu!" : "Không phải số",
        })
        .refine((val) => val > 0, "Giá bán bị thiếu!"),
    })
    .refine((price) => price.sale <= price.mrp, "Giá bán không hợp lệ!"),
};

const fileInfoSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Tên file bị thiếu!"
          : "Không phải chuỗi ký tự",
    })
    .min(1, "Tên file bị thiếu!"),
  type: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Loại file bị thiếu!"
          : "Không phải chuỗi ký tự",
    })
    .min(1, "Loại file bị thiếu!"),
  size: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Kích thước file bị thiếu!"
          : "Không phải số",
    })
    .refine((val) => val > 0, "Kích thước file không hợp lệ!"),
});

const newBookSchema = z.object({
  ...commonBookSchema,
  fileInfo: fileInfoSchema,
});

const BookForm: FC<Props> = ({ title, submitBtnTitle, onSubmit }) => {
  const [bookInfo, setBookInfo] = useState<DefaultForm>(defaultBookInfo);
  const [cover, setCover] = useState("");
  const [busy, setBusy] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>();

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value, name } = target;

    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files, name } = target;

    if (!files) return;

    const file = files[0];

    if (name === "cover") {
      try {
        setCover(URL.createObjectURL(file));
      } catch (error) {
        setCover("");
      }
    }

    setBookInfo({ ...bookInfo, [name]: file });
  };

  const handleBookPublish = async () => {
    setBusy(true);
    try {
      const formData = new FormData();

      const { file, cover } = bookInfo;

      // Validate book file exists and is epub type
      if (!file) {
        return setErrors({
          ...errors,
          file: ["Chọn file sách để tiếp tục."],
        });
      }

      if (file.type !== "application/epub+zip") {
        return setErrors({
          ...errors,
          file: ["Vui lòng chọn file (.epub) hợp lệ."],
        });
      }

      // Validate cover file
      if (cover && !cover.type.startsWith("image/")) {
        return setErrors({
          ...errors,
          cover: ["Vui lòng chọn file bìa hợp lệ."],
        });
      }

      if (cover) {
        formData.append("cover", cover);
      }

      // validate data for book creation
      const bookToSend: BookToSubmit = {
        title: bookInfo.title,
        description: bookInfo.description,
        genre: bookInfo.genre,
        language: bookInfo.language,
        publicationName: bookInfo.publicationName,
        uploadMethod: "aws",
        publishedAt: bookInfo.publishedAt,
        price: {
          mrp: Number(bookInfo.mrp),
          sale: Number(bookInfo.sale),
        },
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      };

      const result = newBookSchema.safeParse(bookToSend);
      if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
          // Join the full path for nested errors (e.g., "price.mrp", "fileInfo.name")
          const path = issue.path.join(".") || "general";
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        });
        return setErrors(fieldErrors);
      }

      if (result.data.uploadMethod === "local") {
        formData.append("book", file);
      }

      for (let key in bookToSend) {
        type keyType = keyof typeof bookToSend;
        const value = bookToSend[key as keyType];

        if (typeof value === "string") {
          formData.append(key, value);
        }

        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        }
      }

      await onSubmit(formData);
    } catch (error) {
      parseError(error);
    } finally {
      setBusy(false);
    }
  };

  const handleBookUpdate = () => {};

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (isForUpdate) handleBookUpdate();
    else handleBookPublish();
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 space-y-6">
      <h1 className="pb-6 font-semibold text-2xl w-full">{title}</h1>

      <div>
        <label className={clsx(errors?.file && "text-red-400")} htmlFor="file">
          <span>Chọn File: </span>
          <input
            accept="application/epub+zip"
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
        </label>

        <ErrorList errors={errors?.file} />
      </div>

      <PosterSelector
        src={cover}
        name="cover"
        fileName={bookInfo.cover?.name}
        isInvalid={errors?.cover ? true : false}
        errorMessage={<ErrorList errors={errors?.cover} />}
        onChange={handleFileChange}
      />

      <Input
        type="text"
        name="title"
        isRequired
        label="Tiêu đề sách"
        placeholder="Nghĩ Giàu và Làm Giàu"
        value={bookInfo.title}
        onChange={handleTextChange}
        isInvalid={errors?.title ? true : false}
        errorMessage={<ErrorList errors={errors?.title} />}
      />

      <RichEditor
        placeholder="Mô tả sách..."
        isInvalid={errors?.description ? true : false}
        errorMessage={<ErrorList errors={errors?.description} />}
        value={bookInfo.description}
        editable
        onChange={(description) => setBookInfo({ ...bookInfo, description })}
      />

      <Input
        name="publicationName"
        type="text"
        label="Tên nhà xuất bản"
        isRequired
        placeholder="Nhà xuất bản Penguin"
        value={bookInfo.publicationName}
        onChange={handleTextChange}
        isInvalid={errors?.publicationName ? true : false}
        errorMessage={<ErrorList errors={errors?.publicationName} />}
      />

      <DatePicker
        onChange={(date) => {
          if (date) {
            setBookInfo({ ...bookInfo, publishedAt: date.toString() });
          }
        }}
        value={bookInfo.publishedAt ? parseDate(bookInfo.publishedAt) : null}
        label="Ngày xuất bản"
        showMonthAndYearPickers
        isRequired
        isInvalid={errors?.publishedAt ? true : false}
        errorMessage={<ErrorList errors={errors?.publishedAt} />}
      />

      <Autocomplete
        label="Ngôn Ngữ"
        placeholder="Chọn ngôn ngữ"
        defaultSelectedKey={bookInfo.language}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, language: key as string });
        }}
        isInvalid={errors?.language ? true : false}
        errorMessage={<ErrorList errors={errors?.language} />}
        isRequired
      >
        {languages.map((item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        })}
      </Autocomplete>

      <Autocomplete
        label="Thể loại"
        placeholder="Chọn thể loại"
        defaultSelectedKey={bookInfo.genre}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, genre: key as string });
        }}
        isInvalid={errors?.genre ? true : false}
        errorMessage={<ErrorList errors={errors?.genre} />}
        isRequired
      >
        {genres.map((item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        })}
      </Autocomplete>

      <div>
        <div className="bg-default-100 rounded-md py-2 px-3">
          <p className={clsx("text-xs pl-3", errors?.price && "text-red-400")}>
            Giá*
          </p>

          <div className="flex space-x-6 mt-2">
            <Input
              name="mrp"
              type="number"
              label="Giá Bán Tối Thiểu"
              isRequired
              placeholder="0.00"
              value={bookInfo.mrp}
              onChange={handleTextChange}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              isInvalid={errors?.price ? true : false}
            />
            <Input
              name="sale"
              type="number"
              label="Giá Bán"
              isRequired
              placeholder="0.00"
              value={bookInfo.sale}
              onChange={handleTextChange}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              isInvalid={errors?.price ? true : false}
            />
          </div>
        </div>
        <div className="p-2">
          <ErrorList errors={errors?.price} />
        </div>
      </div>

      <Button isLoading={busy} type="submit" className="w-full">
        {submitBtnTitle}
      </Button>
    </form>
  );
};

export default BookForm;
