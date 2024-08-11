import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "semibold py-2 px-4 border-none outline-none shadow-none focus:outline-none focus:shadow-outline min-w-[100px]",
        className,
      )}
    >
      {children}
    </button>
  );
};
