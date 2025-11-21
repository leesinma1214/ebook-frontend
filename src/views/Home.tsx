import { type FC } from "react";
import HeroSection from "../components/HeroSection";
import BookByGenre from "../components/BookByGenre";

const Home: FC = () => {

  return (
    <div>
      <HeroSection />
      <BookByGenre genre="Hiện Thực" />
    </div>
  );
};

export default Home;
