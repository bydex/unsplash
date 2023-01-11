import { Gallery } from "../components/Gallery";
import { OrientationSwitcher } from "../components/OrientationSwitcher";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function Favourites() {
  const favouritePhotos = useSelector((state) => {
    return state.favouritePhotos.photos;
  });
  useEffect(() => {}, [favouritePhotos]);

  return (
    <section className={"container mx-auto pt-28 pb-28"}>
      <h1 className={"mb-20 text-center text-7xl font-bold"}>Избранное</h1>

      <div className="container mx-auto">
        <OrientationSwitcher className={"mb-20"} />

        <Gallery initialGallery={favouritePhotos} />
      </div>
    </section>
  );
}
