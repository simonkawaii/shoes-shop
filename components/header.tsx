import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Logo from "./logo";
import NavbarMenu from "./navbar/NavbarMenu";
import SearchBar from "./navbar/SearchBar";

const Header: React.FC = () => {
  const cartContainer = useSelector((state: RootState) => state.cart);
  // width change state
  // menu state

  return (
    <nav className="max-w-screen sticky top-0 z-[9999] flex h-16 items-center  justify-between border-b-[1px]   border-grey/20 bg-white p-2 md:p-5">
      <Logo />
      <SearchBar />
      <NavbarMenu />
    </nav>
  );
};

export default Header;
