import { type FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";
import BookList, { type Book } from "../components/BookList";
import DividerWithTitle from "../components/common/DividerWithTitle";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Search: FC = () => {
  const [result, setResult] = useState<Book[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);
  const [searchParam] = useSearchParams();

  const title = searchParam.get("title");

  useEffect(() => {
    setBusy(true);
    client
      .get<{ results: Book[] }>("/search/books?title=" + title)
      .then(({ data }) => {
        if (!data.results.length) setNotFound(true);
        else setNotFound(false);
        setResult(data.results);
      })
      .finally(() => setBusy(false));
  }, [title]);

  // Search results heading
  const heading = `Search results: ${title}`;

  if (busy) return <LoadingSpinner label="Searching..." />;

  if (notFound)
    return (
      <div className="px-4 py-10">
        <DividerWithTitle title={heading} />
        <p className="text-center p-5 text-2xl font-semibold opacity-50">
          No results found...
        </p>
      </div>
    );

  return (
    <div className="px-4 py-10">
      <BookList data={result} title={heading} />
    </div>
  );
};

export default Search;
