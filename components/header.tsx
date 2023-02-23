import { rejects } from "assert";
import React, { useEffect, useState } from "react";
import Logo from "./logo"

const Header =  () => {
  // width change state
  const [mobileWidth, setMoblieWidth] = useState<number>(0)
  // menu state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMoblieWidth(window.innerWidth)
    // handle width change to present correct view mobile or desktop
    const handleWindowWidthChange = () => {
      setMoblieWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);

  return (
    <div className="flex  z-50 sticky shadow-md h-16 top-0 bg-white justify-between items-center p-2 md:p-5">
        <Logo />
      <div>
        { mobileWidth >= 768 ? (
          <div className="flex gap-5">
            <a href="">abc</a>
            <a href="">abc</a>
            <a href="">abc</a>
          </div>
        ) : (
          <div>
            <button onClick={() => setIsOpen(!isOpen)}>
              menu
              {isOpen && (
                <ul className="flex flex-col gap-2">
                  <li>
                    {" "}
                    <a href="">abc</a>
                  </li>
                  <li>
                    {" "}
                    <a href="">abc</a>
                  </li>
                  <li>
                    {" "}
                    <a href="">abc</a>
                  </li>
                </ul>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
