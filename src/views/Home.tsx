import { type FC, useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";
import { genreList } from "../utils/data";
import client from "../api/client";

const Home: FC = () => {
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenresWithBooks = async () => {
      try {
        const genresWithBooks: string[] = [];

        for (const genre of genreList) {
          try {
            const { data } = await client.get(
              `/book/by-genre/${encodeURIComponent(genre)}`
            );

            // Check if genre has books (try both data.books and data.results)
            const books = data.books || data.results || [];
            if (books.length > 0) {
              genresWithBooks.push(genre);
            }
          } catch {
            // Skip genres that return 404 or have errors
            continue;
          }
        }

        setAvailableGenres(genresWithBooks);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresWithBooks();
  }, []);

  return (
    <div className="space-y-10 px-5 lg:p-0">
      <HeroSection />
      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : (
        availableGenres.map((genre) => (
          <BookByGenre key={genre} genre={genre} />
        ))
      )}
    </div>
  );
};

export default Home;
