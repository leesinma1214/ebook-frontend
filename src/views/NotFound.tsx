import { type FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="flex-1 text-center pt-20">
      <h1 className="text-6xl font-bold opacity-50">Không tìm thấy</h1>
      <p className="mt-4">
        Rất tiếc, chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm!
      </p>
    </div>
  );
};

export default NotFound;
