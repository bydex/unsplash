import { GalleryItem } from "./GalleryItem";
import { photosApiService } from "../services/api/photos.service";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavouritePhotoIdList,
  toggleLikePhoto,
} from "../store/favouritePhotos";

const INITIAL_PAGE = 1;

export function Gallery({ searchQuery, initialGallery }) {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const loader = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialGallery !== undefined) setGallery(initialGallery);
  }, [initialGallery]);

  useInfiniteScroll({
    loader,
    items: gallery,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  const fetchGallery = async ({ page, per_page }) => {
    setIsLoading(true);

    let response;
    if (!searchQuery) {
      response = await photosApiService.getList({
        page,
        per_page,
        orientation: "portrait",
      });

      setGallery((prev) => [...prev, ...response.data]);
    } else {
      response = await photosApiService.search({
        page,
        per_page,
        query: searchQuery,
        orientation: "portrait",
      });

      setGallery((prev) => [...prev, ...response.data.results]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!initialGallery) {
      fetchGallery({ page, per_page: 10 });
    }
  }, [page, searchQuery]);

  useEffect(() => {
    if (!initialGallery) {
      setGallery([]);
      setPage(INITIAL_PAGE);
    }
  }, [searchQuery]);

  const navigate = useNavigate();
  const openDetailPhoto = (galleryItem) => {
    navigate(`/photos/${galleryItem.id}`);
  };

  const dispatch = useDispatch();
  const handleClickHeart = (event, item) => {
    event.stopPropagation();
    dispatch(toggleLikePhoto(item));
  };

  const favouritePhotoIdList = useSelector(selectFavouritePhotoIdList);
  const checkIsLiked = (item) => {
    return favouritePhotoIdList.includes(item.id);
  };

  return (
    <div>
      <Masonry
        breakpointCols={3}
        className="-ml-3 flex w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {gallery.map((item) => (
          <GalleryItem
            onClick={() => openDetailPhoto(item)}
            src={item.urls.regular}
            userFullName={item.user.name}
            userNickname={item.user.username}
            userProfileImgSrc={item.user.profile_image.medium}
            key={item.id}
            alt={item.description}
            ratioWidth={item.width}
            ratioHeight={item.height}
            className="mb-3 last:mb-0"
            onClickHeart={(event) => handleClickHeart(event, item)}
            isLiked={checkIsLiked(item)}
          />
        ))}
      </Masonry>
      {isLoading && <div className={"py-5 text-center"}>Loading...</div>}
      <div ref={loader} key={page}></div>
    </div>
  );
}
