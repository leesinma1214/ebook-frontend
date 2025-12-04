import { Input } from "@heroui/react";
import { type FC, type FormEventHandler, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface Props {}

const SearchForm: FC<Props> = () => {
  const [query, setQuery] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        variant="bordered"
        placeholder="Tìm kiếm sách..."
        endContent={
          <button className="focus:outline-none" type="submit">
            <IoMdSearch size={24} />
          </button>
        }
        className="w-full"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
};

export default SearchForm;
