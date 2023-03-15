import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./logo";

const Header: React.FC = () => {
  // width change state
  const [mobileWidth, setMoblieWidth] = useState<number>(0);
  // menu state
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
    <div className="flex  z-50 sticky shadow-md h-16 top-0 bg-white justify-between items-center p-2 md:p-5">
      <Logo />
      <div>
        {mobileWidth >= 768 ? (
          <div className="flex gap-5">
            <Link href="/">abc</Link>
            <Link href="/">abc</Link>
            <Link href="/">abc</Link>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              menu
              {isOpen && (
                <ul className="flex flex-col gap-2">
                  <li>
                    {" "}
                    <Link href="/">abc</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="/">abc</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="/">abc</Link>
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
