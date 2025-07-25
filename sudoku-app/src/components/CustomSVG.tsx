import { memo, ReactElement } from "react";
interface CustomSVGProps {
  height?: string;
  width?: string;
  strokeWidth?: string;
  viewBox?: string;
  fill?: string;
  className?: string;
  children: ReactElement;
}
const CustomSVG = memo(
  ({
    height = "24px",
    width = "24px",
    strokeWidth = "0",
    viewBox = "0 -960 960 960",
    fill = "#ffff",
    className,
    children,
  }: CustomSVGProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        strokeWidth={strokeWidth}
        viewBox={viewBox}
        fill={fill}
        className={className}
      >
        {children}
      </svg>
    );
  }
);

export default CustomSVG;
