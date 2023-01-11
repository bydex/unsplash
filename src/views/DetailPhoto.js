import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { photosApiService } from "../services/api/photos.service";
import { Button } from "../components/Button";
import { HeartIcon } from "../assets/icons/HeartIcon";
import { DownloadIcon } from "../assets/icons/DownloadIcon";
import { UserProfile } from "../components/UserProfile";
import { downloadFileByLink } from "../utils/helpers";
import { TagsList } from "../components/TagsList";
import classNames from "classnames";
import { Gallery } from "../components/Gallery";
import {
  selectFavouritePhotoIdList,
  toggleLikePhoto,
} from "../store/favouritePhotos";
import { useDispatch, useSelector } from "react-redux";

export function DetailPhoto() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const fetchDetailPhoto = async () => {
    const response = await photosApiService.getDetail({ id });

    setPhoto(response.data);
  };

  const downloadDetailPhoto = async () => {
    const result = await photosApiService.downloadDetail({
      url: photo.urls.regular,
    });

    const imageUrl = window.URL.createObjectURL(result.data);

    downloadFileByLink({ href: imageUrl, fileName: photo.id });
  };

  useEffect(() => {
    fetchDetailPhoto();
  }, [id]);

  const onClickTag = (tag) => {
    navigate(`/?query=${tag.title}`);
  };

  const dispatch = useDispatch();
  const handleClickHeart = () => {
    dispatch(toggleLikePhoto(photo));
  };
  const favouritePhotoIdList = useSelector(selectFavouritePhotoIdList);
  const checkIsLiked = () => {
    return favouritePhotoIdList.includes(photo.id);
  };

  return (
    <div>
      {photo && (
        <div>
          <div
            className={classNames(
              "relative flex min-h-screen justify-center bg-cover bg-center text-white after:absolute after:inset-0 after:bg-dark after:bg-opacity-30 after:backdrop-blur",
              {
                "pb-10": !photo.tags.length,
              }
            )}
            style={{ backgroundImage: `url(${photo.urls.regular})` }}
          >
            <div className="container relative z-10">
              <div className={"flex items-center justify-between py-6"}>
                <UserProfile
                  userProfileImgSrc={photo.user.profile_image.medium}
                  userNickname={photo.user.username}
                  userFullName={photo.user.name}
                  orientation={"horizontal"}
                />
                <div className={"flex gap-5"}>
                  <Button
                    theme={"light"}
                    size={"md"}
                    renderIcon={
                      <HeartIcon
                        className={classNames({
                          "text-red-700": checkIsLiked(),
                        })}
                      />
                    }
                    onClick={handleClickHeart}
                  />
                  <Button
                    onClick={downloadDetailPhoto}
                    theme={"accent"}
                    size={"md"}
                    renderIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </div>
              </div>
              <img
                className={classNames("mx-auto max-h-screen")}
                src={photo.urls.regular}
                alt={photo.alt_description}
              />
              {!!photo.tags.length && (
                <div className={"pb-14 pt-10 text-center"}>
                  <h3 className={"mb-5 text-2xl"}>Похожии теги</h3>

                  <TagsList onClick={onClickTag} items={photo.tags} />
                </div>
              )}
            </div>
          </div>
          {!!photo.tags.length && (
            <div className={"container mx-auto"}>
              <div className={"pt-20 pb-10"}>
                <h2 className={"text-4xl font-semibold"}>Похожие фотографии</h2>
              </div>
              <Gallery searchQuery={photo.tags[0].title} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
