import { type FC, useState } from "react";
import {
  Navbar as HeroUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Badge,
  Input,
} from "@heroui/react";
import { FaBookReader } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileOptions from "../profile/ProfileOptions";
import DarkModeSwitch from "./DarkModeSwitch";
import useCart from "../../hooks/useCart";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import MobileNav from "../MobileNav";

const Navbar: FC = () => {
  const [showNav, setShowNav] = useState(false);
  const { totalCount } = useCart();

  const openNav = () => {
    setShowNav(true);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  return (
    <>
      <HeroUINav>
        <NavbarBrand className="md:flex hidden">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <FaBookReader size={24} />
            <p className="font-bold text-inherit">DiGiRead</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="w-full" justify="center">
          <Input
            variant="bordered"
            placeholder="Tìm kiếm sách..."
            endContent={
              <button className="focus:outline-none" type="button">
                <IoMdSearch size={24} />
              </button>
            }
            className="w-full"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="md:flex hidden">
            <DarkModeSwitch />
          </NavbarItem>
          <NavbarItem className="md:flex hidden">
            <Link to="/cart">
              <Badge content={totalCount} color="danger" shape="circle">
                <FaCartShopping size={24} />
              </Badge>
            </Link>
          </NavbarItem>
          <NavbarItem className="md:flex hidden">
            <ProfileOptions />
          </NavbarItem>

          <NavbarItem
            onClick={openNav}
            className="flex md:hidden cursor-pointer"
          >
            <IoMenu size={26} />
          </NavbarItem>
        </NavbarContent>
      </HeroUINav>

      <MobileNav visible={showNav} onClose={closeNav} />
    </>
  );
};

export default Navbar;
