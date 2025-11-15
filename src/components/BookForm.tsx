import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
} from "@heroui/react";
import { type ChangeEventHandler, type FC, type FormEventHandler, useState } from "react";
import { genres, languages } from "../utils/data";
import PosterSelector from "./PosterSelector";
import RichEditor from "./rich-editor";
import { parseDate } from "@internationalized/date";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
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

const BookForm: FC<Props> = ({ title, submitBtnTitle }) => {
  const [bookInfo, setBookInfo] = useState<DefaultForm>(defaultBookInfo);
  const [cover, setCover] = useState("");
  const [isForUpdate, setIsForUpdate] = useState(false);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value, name } = target;
    console.log(name, value);
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files, name } = target;

    if (!files) return;

    const file = files[0];

    if (name === "cover" && file?.size) {
      setCover(URL.createObjectURL(file));
    } else {
      setCover("");
    }

    setBookInfo({ ...bookInfo, [name]: file });
  };

  const handleBookPublish = () => {
    const formData = new FormData();

    const { file, cover } = bookInfo;

    // Validate book file (must be epub type)
    if (file?.type !== "application/epub+zip") {
      return console.log("Chỉ hỗ trợ định dạng .epub");
    }

    // Validate cover file
    if (cover && !cover.type.startsWith("image/")) {
      return console.log("Vui lòng chọn một ảnh bìa hợp lệ.");
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

      <label htmlFor="file">
        <span>Chọn file: </span>
        <input
          accept="application/epub+zip"
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
        />
      </label>

      <PosterSelector 
        src={cover}
        name="cover"
        fileName={bookInfo.cover?.name}
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
      />

      <RichEditor
        placeholder="Mô tả sách..."
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
      />

      <Autocomplete
        label="Ngôn Ngữ"
        placeholder="Chọn ngôn ngữ"
        defaultSelectedKey={bookInfo.language}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, language: key as string });
        }}
      >
        {languages.map((item) => {
          return (
            <AutocompleteItem key={item.name}>
              {item.name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>

      <Autocomplete
        selectedKey={bookInfo.genre}
        label="Thể loại"
        placeholder="Chọn thể loại"
        defaultSelectedKey={bookInfo.language}
        onSelectionChange={(key = "") => {
          setBookInfo({ ...bookInfo, language: key as string });
        }}
      >
        {genres.map((item) => {
          return (
            <AutocompleteItem key={item.name}>
              {item.name}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>

      <div className="bg-default-100 rounded-md py-2 px-3">
        <p className="text-xs pl-3">Giá*</p>

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
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitBtnTitle}
      </Button>
    </form>
  );
};

export default BookForm;
