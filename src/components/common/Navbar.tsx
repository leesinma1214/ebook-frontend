import { type FC } from "react";
import {
  Navbar as HeroUINav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Badge,
} from "@heroui/react";
import { FaBookReader } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProfileOptions from "../profile/ProfileOptions";
import DarkModeSwitch from "./DarkModeSwitch";
import useCart from "../../hooks/useCart";
  
const Navbar: FC = () => {
  const { totalCount } = useCart();

  return (
    <HeroUINav>
      <NavbarBrand>
        <Link to="/" className="flex items-center justify-center space-x-2">
          <FaBookReader size={24} />
          <p className="font-bold text-inherit">DiGiRead</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <DarkModeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Link to="/cart">
            <Badge content={totalCount} color="danger" shape="circle">
              <FaCartShopping size={24} />
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ProfileOptions />
        </NavbarItem>
      </NavbarContent>
    </HeroUINav>
  );
};

export default Navbar;
