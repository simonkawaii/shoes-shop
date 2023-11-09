import React, { useState } from "react";
//components
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";

const dummyCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const CategoryComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  const renderTags = dummyCategories.map((e) => {
    return (
      <Link
        key={`${e}-key`}
        className="flex
      items-center
  p-4
      text-sm
   font-bold
   
 hover:text-[#F7A855]
   "
        href={`/category/${e}`}
      >
        {e}
      </Link>
    );
  });

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <button className="text-sm ">
        categories
        <ArrowDropDownIcon
          sx={{
            rotate: !open ? "0" : "180deg",
            transition: "300ms",
          }}
        />
      </button>
      <div className="absolute left-[-100%] top-[100%]">
        <div
          className={`grid
      ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        grid-flow-col  grid-rows-[0fr]
        duration-200
        `}
        >
          <div
            className={`  
        z-[9999]
       grid
       w-fit
       overflow-hidden
  bg-white shadow-md`}
          >
            <div className="grid-rows-auto relative grid w-[800px] grid-cols-4 gap-4 p-8 ">
              {renderTags}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
