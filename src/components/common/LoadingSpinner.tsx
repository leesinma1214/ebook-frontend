import { Spinner } from "@heroui/react";
import { type FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <Spinner label="Đang xác nhận..." color="warning" />
    </div>
  );
};

export default LoadingSpinner;
