import classNames from "classnames";
import { useMemo } from "react";

export function Button({
  size = "md",
  theme = "accent",
  children,
  renderIcon,
  onClick = () => {},
  href,
  download,
}) {
  const isMediumSize = useMemo(() => size === "md", [size]);
  const isLightTheme = useMemo(() => theme === "light", [theme]);
  const isAccentTheme = useMemo(() => theme === "accent", [theme]);

  const ButtonTag = useMemo(() => (href ? "a" : "button"), [href]);

  return (
    <ButtonTag
      onClick={onClick}
      className={classNames(
        `button inline-flex cursor-pointer items-center gap-3 rounded-md align-middle transition active:translate-y-0.5`,
        {
          [`h-12 ${children ? "px-4" : "px-3"}`]: isMediumSize,
          "bg-white text-gray-3 hover:bg-gray-3 hover:text-white": isLightTheme,
          "bg-accent text-white hover:bg-white hover:text-accent":
            isAccentTheme,
        }
      )}
      href={href && href}
      download={download && "download"}
    >
      {renderIcon && renderIcon}
      {children && children}
    </ButtonTag>
  );
}
