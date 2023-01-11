import { useMemo } from "react";

export function Tag({ children, tag, onClick }) {
  const CustomTag = useMemo(() => tag ?? "div", [tag]);

  return (
    <CustomTag
      onClick={() => onClick(tag)}
      className={
        "inline-block cursor-pointer rounded-md bg-white py-1 px-2 text-lg leading-6 text-gray-3"
      }
    >
      {children}
    </CustomTag>
  );
}
