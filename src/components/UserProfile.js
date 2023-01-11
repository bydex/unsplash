import classNames from "classnames";
import { useMemo } from "react";

export function UserProfile({
  userProfileImgSrc,
  userFullName,
  userNickname,
  orientation = "vertical",
  size = "md",
  className,
}) {
  const isVerticalOrientation = useMemo(
    () => orientation === "vertical",
    [orientation]
  );
  const isHorizontalOrientation = useMemo(
    () => orientation === "horizontal",
    [orientation]
  );
  const isLargeSize = useMemo(() => size === "lg", [size]);
  const isMediumSize = useMemo(() => size === "md", [size]);

  return (
    <div
      className={classNames("flex", className, {
        "flex-col": isVerticalOrientation,
        "items-center": isHorizontalOrientation,
      })}
    >
      <img
        className={classNames(`rounded-md border border-white`, {
          "mx-auto mb-3": isVerticalOrientation,
          "mr-3 mt-2": isHorizontalOrientation,
          "h-[70px] w-[70px]": isLargeSize,
          "h-[54px] w-[54px]": isMediumSize,
        })}
        src={userProfileImgSrc}
        alt={`Portfolio of user ${userFullName}`}
      />
      <div
        className={classNames({
          "text-left": isHorizontalOrientation,
          "text-center": isVerticalOrientation,
        })}
      >
        <h3
          className={classNames(
            "overflow-hidden overflow-ellipsis whitespace-nowrap text-3xl leading-9"
          )}
        >
          {userFullName}
        </h3>
        <p className={classNames("text-lg leading-5")}>@{userNickname}</p>
      </div>
    </div>
  );
}
