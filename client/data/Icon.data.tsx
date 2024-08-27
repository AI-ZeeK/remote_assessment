import { CiGrid42, CiUser } from "react-icons/ci";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram, IoIosLogOut } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "IoLogoInstagram":
      return <IoLogoInstagram fontSize={18} />;
    case "FaYoutube":
      return <FaYoutube fontSize={18} />;
    case "FaFacebook":
      return <FaFacebook fontSize={18} />;
    case "FaTwitter":
      return <FaTwitter fontSize={18} />;
    case "CiGrid42":
      return <CiGrid42 fontSize={24} />;
    case "CiUser":
      return <CiUser fontSize={24} />;
    case "MdOutlineLocalShipping":
      return <MdOutlineLocalShipping fontSize={24} />;
    case "IoWalletOutline":
      return <IoWalletOutline fontSize={24} />;
    case "IoIosLogOut":
      return <IoIosLogOut fontSize={24} />;
    default:
      return null;
  }
};
