import { FC } from "react";
import { HiPencil } from "react-icons/hi";

type Props = {
  onClickSettings: () => void;
};

const Navbar: FC<Props> = ({ onClickSettings }) => {
  return (
    <div
      className="absolute top-6 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
      onClick={onClickSettings}
    >
      <HiPencil size={25} className="text-gray-500" />
    </div>
  );
};

export default Navbar;
