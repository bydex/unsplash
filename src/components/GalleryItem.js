import lozad from "lozad";
import { useEffect } from "react";
import { HeartIcon } from "../assets/icons/HeartIcon";
import { FullscreenIcon } from "../assets/icons/FullscreenIcon";
import { DownloadIcon } from "../assets/icons/DownloadIcon";
import { UserProfile } from "./UserProfile";
import classNames from "classnames";

function OverlayMenu({
  userProfileImgSrc,
  userFullName,
  userNickname,
  onClickHeart,
  isLiked,
}) {
  return (
    <div
      className={
        "absolute inset-0 z-30 z-10 flex flex-col items-center justify-center rounded-md bg-overlay p-6 opacity-0 backdrop-blur-[8px] transition hover:opacity-100"
      }
    >
      <div className={"flex max-h-[270px] max-w-full grow flex-col text-white"}>
        <UserProfile
          userProfileImgSrc={userProfileImgSrc}
          userNickname={userNickname}
          userFullName={userFullName}
          orientation={"vertical"}
          className={"mb-6"}
        />
        <div className={"mt-auto flex items-center justify-center gap-8"}>
          <button onClick={onClickHeart}>
            <HeartIcon
              className={classNames({
                "text-red-700": isLiked,
              })}
              width={"29"}
              height={"29"}
            />
          </button>
          <button>
            <FullscreenIcon />
          </button>
          <button>
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export function GalleryItem({
  src,
  alt = "",
  ratioWidth,
  ratioHeight,
  className = "",
  userProfileImgSrc,
  userFullName,
  userNickname,
  onClick,
  onClickHeart,
  isLiked,
}) {
  const { observe } = lozad("[data-use-lozad]");
  useEffect(() => {
    observe();
  }, [observe]);

  return (
    <div onClick={onClick} className={`relative cursor-pointer ${className}`}>
      <OverlayMenu
        userProfileImgSrc={userProfileImgSrc}
        userNickname={userNickname}
        userFullName={userFullName}
        onClickHeart={onClickHeart}
        isLiked={isLiked}
      />
      <figure
        className={`shadow-dark/14 overflow-hidden rounded-md shadow-2xl`}
        style={{ aspectRatio: (ratioWidth / ratioHeight).toString() }}
      >
        <img data-use-lozad="" data-src={src} alt={alt} />
      </figure>
    </div>
  );
}
