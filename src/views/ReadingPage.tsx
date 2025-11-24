import { type FC, useEffect, useState } from "react";
import EpubReader from "../components/EpubReader";
import client from "../api/client";
import { useParams } from "react-router-dom";
import { parseError } from "../utils/helper";

interface BookAPIRes {
  settings: {
    highlights: string[];
    lastLocation: string;
  };
  url: string;
}

const ReadingPage: FC = () => {
  const [url, setUrl] = useState("");
  const { slug } = useParams();
  useEffect(() => {
    if (!slug) return;

    const fetchBookUrl = async () => {
      try {
        const { data } = await client.get<BookAPIRes>(`/book/read/${slug}`);
        setUrl(data.url);
      } catch (error) {
        parseError(error);
      }
    };

    fetchBookUrl();
  }, []);

  return (
    <div>
      <EpubReader url={url} />
    </div>
  );
};

export default ReadingPage;
