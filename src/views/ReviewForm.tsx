import { Button } from "@heroui/react";
import { type FC, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import RichEditor from "../components/rich-editor";

interface Props {}

const ReviewForm: FC<Props> = () => {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const { bookId } = useParams();

  const updateRatingChanges = (rating: number) => {
    const newRatings = Array<string>(rating).fill("selected");
    setSelectedRatings(newRatings);
  };

  const ratings = Array(5).fill("");

  return (
    <form className="p-5 space-y-6">
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

      <RichEditor placeholder="Viết về cuốn sách..." />

      <Button type="submit">Đánh giá</Button>
    </form>
  );
};

export default ReviewForm;
