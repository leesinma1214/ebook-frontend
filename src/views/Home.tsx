import { type FC } from "react";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";

const Home: FC = () => {

  return (
    <div className="space-y-10 px-5 lg:p-0">
      <HeroSection />
      <BookByGenre genre="Hiện Thực" />
    </div>
  );
};

export default Home;
