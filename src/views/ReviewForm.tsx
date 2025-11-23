import { type FC } from "react";
import { useParams } from "react-router-dom";

const ReviewForm: FC = () => {
  const { bookId } = useParams();

  return (
    <form>
      {/* Rating Bar */}

      {/* Editor (Rich Editor) */}

      {/* Submit Button */}
    </form>
  );
};

export default ReviewForm;
