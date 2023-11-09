import React, { useState, useEffect } from "react";
import { menuLinks } from "./NavbarMenuLinksData";
import Link from "next/link";
import MenuCart from "../cartComponents/menuCart";
const NavbarMenu = () => {
  const renderMenu = menuLinks.map(({ pathName, url, id }) => {
    return (
      <Link key={id} href={url}>
        {pathName}
      </Link>
    );
  });

  const renderMobileMenu = menuLinks.map(({ pathName, url, id }) => {
    return (
      <li key={id}>
        <Link href={url}>{pathName}</Link>
      </li>
    );
  });

  const [mobileWidth, setMoblieWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setMoblieWidth(window.innerWidth);
    // handle width change to present correct view mobile or desktop

    const handleWindowWidthChange = (): void => {
      setMoblieWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);

  return (
    <div className="flex gap-5 ">
      <Link href="/cart">
        <MenuCart />
      </Link>
      {mobileWidth >= 768 ? (
        renderMenu
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            open
          </button>
          <ul>{isOpen && renderMobileMenu}</ul>
        </>
      )}
    </div>
  );
};

export default NavbarMenu;
