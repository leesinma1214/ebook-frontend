import { type FC, useEffect, useState } from "react";
import client from "../api/client";
import { parseError } from "../utils/helper";
import Skeletons from "./skeletons";
import BookList, { type Book } from "./BookList";

interface Props {
  genre: string;
}

const BookByGenre: FC<Props> = ({ genre }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const fetchBooks = async (genre: string) => {
      try {
        const { data } = await client.get("/book/by-genre/" + genre);
        // Handle both data.books and data.results
        const booksList = data.books || data.results || [];
        setBooks(booksList);
      } catch (error) {
        parseError(error);
        setBooks([]);
      } finally {
        setBusy(false);
      }
    };

    fetchBooks(genre);
  }, [genre]);

  if (busy) return <Skeletons.BookList />;

  // Don't render if no books
  if (books.length === 0) return null;

  return <BookList title={genre} data={books} />;
};

export default BookByGenre;
