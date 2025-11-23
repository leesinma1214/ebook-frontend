import { Button } from "@heroui/react";
import { type FC, type FormEventHandler, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import RichEditor from "../components/rich-editor";
import toast from "react-hot-toast";
import client from "../api/client";
import { parseError } from "../utils/helper";
import { AxiosError } from "axios";

const ReviewForm: FC = () => {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { bookId } = useParams();

  const updateRatingChanges = (rating: number) => {
    const newRatings = Array<string>(rating).fill("selected");
    setSelectedRatings(newRatings);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!selectedRatings.length)
      return toast.error("Vui lòng chọn đánh giá sao.");

    try {
      setLoading(true);
      await client.post("/review", {
        bookId,
        rating: selectedRatings.length,
        content,
      });

      toast.success("Cảm ơn bạn đã để lại đánh giá.");
    } catch (error) {
      parseError(error);
    } finally {
      setLoading(false);
    }
  };

  const ratings = Array(5).fill("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await client.get("/review/" + bookId);
        setContent(data.content || "");
        updateRatingChanges(data.rating);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) return;
          parseError(error);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchReview();
  }, [bookId]);

  if (fetching)
    return (
      <div className="text-center p-5">
        <p>Vui lòng chờ...</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-6">
      {ratings.map((_, index) => {
        return (
          <Button
            isIconOnly
            color="warning"
            variant="light"
            radius="full"
            key={index}
            onPress={() => updateRatingChanges(index + 1)}
          >
            {selectedRatings[index] === "selected" ? (
              <FaStar size={24} />
            ) : (
              <FaRegStar size={24} />
            )}
          </Button>
        );
      })}

      <RichEditor
        value={content}
        onChange={setContent}
        placeholder="Viết thứ gì đấy về sách..."
        editable
      />

      <Button isLoading={loading} type="submit">
        Đăng đánh giá
      </Button>
    </form>
  );
};

export default ReviewForm;
