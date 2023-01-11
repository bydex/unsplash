import { useCallback, useEffect } from "react";

export function useInfiniteScroll({ loader, items, onIntersect }) {
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && items.length) {
        onIntersect();
      }
    },
    [items.length]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px 0px 40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
}
