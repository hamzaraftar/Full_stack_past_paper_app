import { Link, useNavigate } from "react-router";
import { ACCESS_TOKEN } from "../constant";

const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

function UploadIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 19V6M6 12l6-6 6 6" />
      <path d="M4 19h16" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem(ACCESS_TOKEN));

  function handleUploadClick() {
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-14">
      <div className="mx-auto max-w-4xl text-center">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#B0895A]">
          Built by students, for students
        </span>

        <h1
          className={`${display} mt-5 text-3xl font-extrabold leading-tight text-[#17193B] sm:text-5xl`}
        >
          The paper you upload today
          <br className="hidden sm:block" /> could save someone's exam tomorrow.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[#17193B]/70">
          Someone helped you find that past paper you needed. Now it's your turn
          — share what you have and help the next student who's stuck where you
          once were.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Upload button — checks login first */}
          <button
            onClick={handleUploadClick}
            className="cursor-pointer flex items-center gap-2 rounded-full bg-[#16202B] px-6 py-3 text-sm font-semibold text-[#F6F1E4] transition-colors hover:bg-[#0F1720]"
          >
            <UploadIcon className="h-4 w-4" />
            Upload a paper
          </button>

          {/* Browse button — always open */}
          <Link
            to="/papers"
            className="flex items-center gap-2 rounded-full border-2 border-[#16202B] px-6 py-3 text-sm font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4]"
          >
            <SearchIcon className="h-4 w-4" />
            Browse papers
          </Link>
        </div>

        <p className="mt-5 text-xs text-[#17193B]/50">
          Free, always. No sign-up needed to download.
        </p>
      </div>
    </section>
  );
}

export default Hero;
