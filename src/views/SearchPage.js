import { SearchForm } from "../components/SearchForm";
import { Gallery } from "../components/Gallery";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { OrientationSwitcher } from "../components/OrientationSwitcher";

export function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("set", searchParams.get("query"), inputValue);
    searchParams.get("query") && setInputValue(searchParams.get("query"));
  }, [searchParams]);

  useEffect(() => {
    inputValue &&
      setSearchParams({
        query: inputValue,
      });
  }, [inputValue]);

  return (
    <div>
      <div className="mb-20 bg-dark pb-24 pt-4 text-light">
        <div className="container mx-auto">
          <SearchForm
            inputValue={inputValue}
            onUpdateInputValue={setInputValue}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <OrientationSwitcher className={"mb-20"} />

        <Gallery searchQuery={inputValue} />
      </div>
    </div>
  );
}
