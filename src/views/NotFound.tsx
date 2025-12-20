import { type FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="flex-1 text-center pt-20">
      <h1 className="text-6xl font-bold opacity-50">Not Found</h1>
      <p className="mt-4">Sorry, we couldn't find what you're looking for!</p>
    </div>
  );
};

export default NotFound;
