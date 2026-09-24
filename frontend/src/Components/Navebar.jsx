import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constant";
import api from "../api";

// Same fonts as LoginPage.jsx (see the <link> comment there).
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0895A]";

function Navbar() {
  const navigater = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem(ACCESS_TOKEN));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchUser() {
      try {
        const res = await api.get("api/users/me/");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
  }, [isLoggedIn]);

  function handleclick() {
    localStorage.clear();
    navigater("/login");
  }

  function onUploadClick() {
    if (isLoggedIn) {
      navigater("/upload");
    } else {
      navigater("/login");
    }
  }

  const initial = user?.username ? user.username.charAt(0).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-30 border-b border-[#17193B]/10 bg-[#F6F1E4]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16202B] text-[#F6F1E4]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M7 3.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
              <path d="M14 3.5V8h4" />
              <path d="M9 12.5h6" />
              <path d="M9 15.5h6" />
            </svg>
          </span>
          <span className={`${display} text-xl font-extrabold`}>
            PaperVault
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-8 md:flex"></nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onUploadClick}
            className={`cursor-pointer hidden items-center gap-2 rounded-full border-2 border-[#16202B] px-4 py-2 text-sm font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4] sm:flex ${focusRing}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 19V6M6 12l6-6 6 6" />
            </svg>
            Upload a paper
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-[#B0895A] text-sm font-bold text-white ${focusRing}`}
                aria-label="Account menu"
              >
                {initial || "•"}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#17193B]/10 bg-white py-1.5 shadow-lg">
                  <div className="border-b border-[#17193B]/10 px-4 py-2.5">
                    <p className=" truncate text-sm font-semibold text-[#17193B]">
                      {user?.username || "Loading..."}
                    </p>
                    <p className="truncate text-sm text-[#17193B]/60">
                      {user?.email || ""}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-[#17193B] hover:bg-[#F6F1E4]"
                  >
                    My uploads
                  </Link>
                  <button
                    onClick={handleclick}
                    className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-[#A3432E] hover:bg-[#F6F1E4]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`rounded-full px-4 py-2 text-sm font-semibold text-[#17193B] hover:bg-[#17193B]/5 ${focusRing}`}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className={`rounded-full bg-[#16202B] px-4 py-2 text-sm font-semibold text-[#F6F1E4] transition-colors hover:bg-[#0F1720] ${focusRing}`}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
