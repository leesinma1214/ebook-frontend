import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
} from "@heroui/react";
import { type FC } from "react";
import { genres, languages } from "../utils/data";
import PosterSelector from "./PosterSelector";
import RichEditor from "./rich-editor";

interface Props {
  title: string;
  submitBtnTitle: string;
  initialState?: unknown;
}

const BookForm: FC<Props> = ({ title, submitBtnTitle }) => {
  return (
    <form className="p-10 space-y-6">
      <h1 className="pb-6 font-semibold text-2xl w-full">{title}</h1>

      <label htmlFor="file">
        <span>Chọn file: </span>
        <input
          accept="application/epub+zip"
          type="file"
          name="file"
          id="file"
        />
      </label>

       <PosterSelector />

      <Input
        type="text"
        name="title"
        isRequired
        label="Tiêu đề sách"
        placeholder="Nghĩ Giàu và Làm Giàu"
      />

      <RichEditor
        placeholder="Mô tả sách..."
        editable
      />

      <Input
        name="publicationName"
        type="text"
        label="Tên nhà xuất bản"
        isRequired
        placeholder="Nhà xuất bản Penguin"
      />

      <DatePicker label="Ngày xuất bản" showMonthAndYearPickers isRequired />

      <Autocomplete
        label="Ngôn Ngữ"
        placeholder="Chọn ngôn ngữ"
        items={languages}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        }}
      </Autocomplete>

      <Autocomplete label="Thể loại" placeholder="Chọn thể loại" items={genres}>
        {(item) => {
          return (
            <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
          );
        }}
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
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
        </div>
      </div>

      <Button className="w-full">{submitBtnTitle}</Button>
    </form>
  );
};

export default BookForm;
