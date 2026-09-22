import { Link } from "react-router-dom";

// Same fonts as Home.jsx / LoginPage.jsx (see the <link> comment there).
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";
const body = "font-['Figtree',ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0895A]";

function NotFoundPage() {
  return (
    <div
      className={`${body} flex min-h-screen flex-col items-center justify-center bg-[#F6F1E4] px-6 py-12 text-[#17193B]`}
    >
      {/* Logo */}
      <Link
        to="/"
        className={`mb-10 flex items-center gap-2.5 rounded-lg ${focusRing}`}
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
        <span className={`${display} text-xl font-extrabold`}>PaperVault</span>
      </Link>

      {/* Card with offset colour block behind it */}
      <div className="relative w-full max-w-md pb-4 pr-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#B0895A]"
        />

        <div className="relative flex flex-col items-center rounded-3xl border border-[#17193B]/10 bg-white p-10 text-center shadow-sm sm:p-12">
          {/* torn-paper / missing-page mark */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-[#B0895A]"
            aria-hidden="true"
          >
            <path d="M7 3.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
            <path d="M14 3.5V8h4" />
            <path d="M9.5 13.5l5 5" />
            <path d="M14.5 13.5l-5 5" />
          </svg>

          <p
            className={`${display} mt-5 text-6xl font-extrabold tracking-tight`}
          >
            404
          </p>
          <h1
            className={`${display} mt-3 text-2xl font-extrabold tracking-tight`}
          >
            This paper's gone missing
          </h1>
          <p className="mt-2 text-[#17193B]/70">
            The page you're looking for isn't in the vault. It may have been
            moved or never existed.
          </p>

          <Link
            to="/"
            className={`mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#16202B] px-8 py-3.5 text-base font-semibold text-[#F6F1E4] shadow-lg shadow-[#16202B]/20 transition-colors hover:bg-[#0F1720] active:bg-[#0A1017] ${focusRing}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to PaperVault
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
