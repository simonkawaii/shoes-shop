import React, { useEffect, useState } from "react";
import qs from "query-string";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryComponent from "./CategoryComponent";

const SearchBar = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const product = searchParams.get("Name");

  const [query, setQuery] = useState<any>(product || "");

  useEffect(() => {}, [router, query]);

  return (
    <div className="flex items-center gap-4">
      <CategoryComponent />
      <div className="relative z-50  hidden w-[350px] items-center justify-center overflow-hidden rounded-full border-[1px] border-grey/20 shadow sm:flex">
        <form
          action=""
          className="w-[100%]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!query || query === "") return;

            router.push(`/search/${query}`);
          }}
        >
          <input
            className=" focus:shadow-outline w-[100%]   appearance-none py-2 px-3 text-sm leading-tight text-grey focus:outline-none "
            type="text"
            name=""
            id=""
            placeholder="search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </form>
        <div className="absolute right-0   flex h-full w-[50px] items-center justify-center border-l-2 border-grey/20 ">
          <button
            type="button"
            className="h-[inherit] w-[inherit] rounded-full rounded-tl-none rounded-bl-none bg-white hover:bg-black/10"
            onClick={(e) => {
              e.preventDefault();
              if (!query || query === "") return;
              const toQuery = {
                product: query,
              };

              const URL = qs.stringifyUrl(
                {
                  url: window.location.href + "/search/",
                  query: toQuery,
                },
                {
                  skipEmptyString: true,
                  skipNull: true,
                }
              );
              console.log(URL);

              router.push(`/search/${query}`);
            }}
          >
            <SearchIcon sx={{ color: "rgba(55, 65, 81,0.5)" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
