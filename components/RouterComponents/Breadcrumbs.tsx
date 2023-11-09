import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ router }: { router: any }) => {
  const linkPath = router.asPath.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path: string, i: string) => {
    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  const renderSplittedLinks = pathArray.map((e: any, index: any) => {
    if (e === pathArray.at(-1)) {
      return (
        <React.Fragment key={`${e.href}/${e.breadcrumb}`}>
          <Link
            className="
    rounded-md
     p-2
     underline
    hover:text-purple-600
                "
            href={e.href}
          >
            {e.breadcrumb}
          </Link>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={`${e.href}/${e.breadcrumb}`}>
        <Link
          className="
     rounded-md
     p-2
     underline
    hover:text-purple-600
                  "
          key={`${e.href}/${e.breadcrumb}`}
          href={e.href}
        >
          {e.breadcrumb}
        </Link>
        <span>&mdash;</span>
      </React.Fragment>
    );
  });

  return (
    <div
      className="flex items-center 
    justify-start
    gap-2
    sm:justify-center
    sm:gap-4  [&>*]:text-sm
    "
    >
      {renderSplittedLinks}
    </div>
  );
};

export default Breadcrumbs;
