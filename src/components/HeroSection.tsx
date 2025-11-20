import { Button } from "@heroui/react";
import { type FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const books = [
  {
    title: "Murder on the Orient Express",
    slogan: "Khám phá bí ẩn trên chuyến tàu Orient Express!",
    subtitle: "Một hành trình ly kỳ qua những âm mưu và lừa dối.",
    cover:
      "https://playhouseonthesquare.org/assets/2991/10_murder_on_the_orient_express_square.png",
    slug: "murder-on-the-orient-express-668f9ee73d175a420fa4de9a",
  },
  {
    title: "To Kill a Mockingbird",
    slogan: "Khám phá lòng dũng cảm trong thị trấn nhỏ.",
    subtitle: "Một câu chuyện bất hủ về công lý và lòng trắc ẩn.",
    cover:
      "https://www.haydnsymons.com/wp-content/uploads/2013/07/book-cover-illustration.jpg",
    slug: "to-kill-a-mockingbird-668f9ee73d175a420fa4de9d",
  },
  {
    title: "The Girl with the Dragon Tattoo",
    slogan: "Khám phá bí mật cùng cô gái và hình xăm rồng.",
    subtitle: "Một câu chuyện trinh thám ly kỳ về bí ẩn và báo thù.",
    cover:
      "https://m.media-amazon.com/images/I/51SdIh45zAL.jpg",
    slug: "the-girl-with-the-dragon-tattoo-668f9ee73d175a420fa4debb",
  },
  {
    title: "The Hunger Games",
    slogan: "Sống sót trong trò chơi, châm ngòi cuộc nổi dậy.",
    subtitle: "Cuộc phiêu lưu hùng tráng về sự sống còn và kiên cường.",
    cover:
      "https://cdn11.bigcommerce.com/s-nfxi2m/images/stencil/500x659/products/663/1414/Hunger-Games-Book__38075.1692810297.jpg?c=2",
    slug: "the-hunger-games-668f9ee73d175a420fa4debe",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const HeroSection: FC = () => {
  return (
    <div className="md:h-96 rounded-medium p-5 bg-[#faf7f2] dark:bg-[#231e1a]">
      <Slider {...settings}>
        {books.map((item) => {
          return (
            <div key={item.slug}>
              <div className="md:flex justify-between">
                <div className="flex-1 flex flex-col justify-center p-5">
                  <h1 className="lg:text-6xl text-3xl">{item.slogan}</h1>
                  <p className="md:text-lg mt-3 italic">{item.subtitle}</p>
                  <div className="mt-3">
                    <Button
                      radius="sm"
                      color="danger"
                      variant="bordered"
                      endContent={<FaArrowRightLong />}
                      as={Link}
                      to={`/book/${item.slug}`}
                    >
                      Xem Ngay
                    </Button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex items-center justify-center">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="md:w-48 md:h-80 w-32 rounded-md object-cover shadow-lg rotate-12"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroSection;
