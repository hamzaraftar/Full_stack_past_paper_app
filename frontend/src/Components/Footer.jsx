import { Link } from "react-router-dom";

const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

function FileIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V8h4" />
      <path d="M9 12.5h6" />
      <path d="M9 15.5h6" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#17193B]/10 bg-[#16202B] text-[#F6F1E4]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F1E4] text-[#16202B]">
            <FileIcon className="h-4 w-4" />
          </span>
          <span className={`${display} text-lg font-extrabold`}>
            PaperVault
          </span>
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#F6F1E4]/70">
          <Link to="/papers" className="hover:text-[#F6F1E4]">
            Browse papers
          </Link>
          <Link to="/upload" className="hover:text-[#F6F1E4]">
            Upload a paper
          </Link>
          <Link to="/profile" className="hover:text-[#F6F1E4]">
            My uploads
          </Link>
          <Link to="/about" className="hover:text-[#F6F1E4]">
            About
          </Link>
         
        </nav>

        {/* Copyright */}
        <p className="text-xs text-[#F6F1E4]/50">
          © {new Date().getFullYear()} PaperVault
        </p>
      </div>
    </footer>
  );
}

export default Footer;
