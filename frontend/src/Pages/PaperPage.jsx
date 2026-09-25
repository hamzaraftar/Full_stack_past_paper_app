import { useState, useEffect } from "react";
import api from "../api";

// Same accent colors as Navbar.jsx
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

// Django backend
const FILE_BASE_URL = "http://localhost:8000";

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

function formatDate(iso) {
  const d = new Date(iso);

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PaperCard({ paper }) {
  const year = new Date(paper.uploaded_at).getFullYear();

  // paper.file already starts with "/"
  const fileUrl = paper.file?.startsWith("http")
    ? paper.file
    : `${FILE_BASE_URL}${paper.file}`;

  return (
    <div className="flex flex-col rounded-2xl border border-[#17193B]/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F1E4] text-[#B0895A]">
          <FileIcon className="h-5 w-5" />
        </span>

        <span className="rounded-full bg-[#F6F1E4] px-3 py-1 text-xs font-semibold text-[#17193B]/70">
          {year}
        </span>
      </div>

      {/* Title + meta */}
      <div className="mt-4 flex-1">
        <h3 className={`${display} text-lg font-bold text-[#17193B]`}>
          {paper.title}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#17193B]/70">
          <span className="text-[#2563EB]">{paper.university}</span> ·{" "}
          {paper.subject}
        </p>

        <p className="mt-1 text-xs text-[#17193B]/50">
          Uploaded {formatDate(paper.uploaded_at)}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-[#17193B]/10 pt-3">
        <div className="mb-3">
          <span className="block truncate text-xs text-[#17193B]/50">
            Shared by <span className="font-bold">{paper.uploaded_by}</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* View */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-[#16202B] px-4 py-2 text-center text-xs font-semibold text-[#F6F1E4] transition-colors hover:bg-[#0F1720]"
          >
            View
          </a>

          {/* Download */}
          <button
            onClick={async () => {
              try {
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");

                link.href = url;
                link.download = paper.file.split("/").pop();

                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Download failed:", error);
              }
            }}
            className="cursor-pointer flex-1 rounded-full border border-[#16202B] px-4 py-2 text-center text-xs font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4]"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-[#17193B]/10 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-[#F6F1E4]" />

        <div className="h-6 w-12 animate-pulse rounded-full bg-[#F6F1E4]" />
      </div>

      <div className="mt-4 flex-1 space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-[#F6F1E4]" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-[#F6F1E4]" />

        <div className="h-3 w-1/3 animate-pulse rounded bg-[#F6F1E4]" />
      </div>

      <div className="mt-5 border-t border-[#17193B]/10 pt-3">
        <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#F6F1E4]" />

        <div className="flex gap-2">
          <div className="h-8 flex-1 animate-pulse rounded-full bg-[#F6F1E4]" />

          <div className="h-8 flex-1 animate-pulse rounded-full bg-[#F6F1E4]" />
        </div>
      </div>
    </div>
  );
}

function PaperPage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true);

        const response = await api.get("api/papers/");

        setPapers(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Couldn't load papers. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPapers();
  }, []);

  return (
    <section className="bg-[#F6F1E4] px-6 py-10 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className={`${display} text-2xl font-extrabold text-[#17193B]`}>
            Papers
          </h2>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 rounded-xl border border-[#A3432E]/20 bg-[#A3432E]/5 px-4 py-3 text-sm text-[#A3432E]">
            {error}
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : papers.length === 0 ? (
            <p className="col-span-full py-10 text-center text-sm text-[#17193B]/60">
              No papers uploaded yet.
            </p>
          ) : (
            papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default PaperPage;
