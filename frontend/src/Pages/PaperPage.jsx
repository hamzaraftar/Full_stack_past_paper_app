import { useState, useEffect, useMemo } from "react";
import api from "../api";

const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

// Django backend
const FILE_BASE_URL = "http://localhost:8000";

// API endpoints (relative to your api.js baseURL, same style as before)
const PAPERS_URL = "api/papers/";
const UNIVERSITIES_URL = "api/university/";
const universityPapersUrl = (id) => `api/universitypapers/${id}/`;

// Handles plain arrays, DRF pagination ({ results: [] }) and { papers: [] }
function toList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.papers)) return data.papers;
  return [];
}

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

function SearchIcon({ className }) {
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
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ChevronIcon({ className }) {
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
      <path d="m6 9 6 6 6-6" />
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

function getUniversityName(paper, fallback) {
  return (
    paper.university?.name ||
    paper.university_name ||
    (typeof paper.university === "string" ? paper.university : "") ||
    fallback ||
    ""
  );
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none rounded-full border border-[#17193B]/15 bg-white py-2 pl-4 pr-9 text-xs font-semibold text-[#17193B] outline-none transition-colors hover:border-[#17193B]/40 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
      >
        {children}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#17193B]/60" />
    </div>
  );
}

function PaperCard({ paper, fallbackUniversity }) {
  const year = new Date(paper.uploaded_at).getFullYear();
  const universityName = getUniversityName(paper, fallbackUniversity);

  // paper.file already starts with "/"
  const fileUrl = paper.file?.startsWith("http")
    ? paper.file
    : `${FILE_BASE_URL}${paper.file}`;

  return (
    <div className="group flex flex-col rounded-2xl border border-[#17193B]/10 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
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
        <h3
          className={`${display} text-lg font-bold text-[#111c38] transition group-hover:text-[#a87845]`}
        >
          {paper.title}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#17193B]/70">
          <span className="text-[#2563EB]">{universityName}</span>{" "}
          <span className="text-[#17193B]/70">Code</span>{" "}
          {paper.course_code}
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
            className="flex-1 cursor-pointer rounded-full border border-[#16202B] px-4 py-2 text-center text-xs font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4]"
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

  const [universities, setUniversities] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [universityId, setUniversityId] = useState(""); // "" = all
  const [courseCode, setCourseCode] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("newest");

  // Load universities once (for the University dropdown)
  useEffect(() => {
    let cancelled = false;

    async function fetchUniversities() {
      try {
        const response = await api.get(UNIVERSITIES_URL);
        if (!cancelled) setUniversities(toList(response.data));
      } catch (err) {
        // Not fatal: the page still works without the university filter
        console.error("Couldn't load universities:", err);
      }
    }

    fetchUniversities();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load papers: all papers, or only the selected university's papers
  useEffect(() => {
    let cancelled = false;

    async function fetchPapers() {
      try {
        setLoading(true);

        const url = universityId
          ? universityPapersUrl(universityId)
          : PAPERS_URL;

        const response = await api.get(url);

        if (cancelled) return;

        setPapers(toList(response.data));
        setError(null);
      } catch (err) {
        if (cancelled) return;

        console.error(err);
        setPapers([]);
        setError("Couldn't load papers. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPapers();

    return () => {
      cancelled = true;
    };
  }, [universityId]);

  const selectedUniversityName =
    universities.find((u) => String(u.id) === String(universityId))?.name ||
    "";

  // Options for Course code and Year, built from the papers currently loaded
  const courseCodes = useMemo(
    () =>
      [...new Set(papers.map((p) => p.course_code).filter(Boolean))].sort(
        (a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }),
      ),
    [papers],
  );

  const years = useMemo(
    () =>
      [
        ...new Set(
          papers.map((p) => new Date(p.uploaded_at).getFullYear()),
        ),
      ]
        .filter((y) => !Number.isNaN(y))
        .sort((a, b) => b - a),
    [papers],
  );

  // Search + course code + year + sort (all client-side)
  const visiblePapers = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = papers.filter((paper) => {
      if (courseCode && String(paper.course_code) !== courseCode) return false;

      if (
        year &&
        String(new Date(paper.uploaded_at).getFullYear()) !== year
      ) {
        return false;
      }

      if (!q) return true;

      const haystack = [
        paper.title,
        getUniversityName(paper, selectedUniversityName),
        paper.course_code,
        paper.uploaded_by,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "title") return String(a.title).localeCompare(String(b.title));

      const diff = new Date(a.uploaded_at) - new Date(b.uploaded_at);
      return sort === "oldest" ? diff : -diff;
    });
  }, [papers, search, courseCode, year, sort, selectedUniversityName]);

  const hasActiveFilters =
    search.trim() !== "" ||
    universityId !== "" ||
    courseCode !== "" ||
    year !== "" ||
    sort !== "newest";

  function handleUniversityChange(value) {
    setUniversityId(value);
    // Course codes and years belong to the loaded university, so reset them
    setCourseCode("");
    setYear("");
  }

  function clearAll() {
    setSearch("");
    setUniversityId("");
    setCourseCode("");
    setYear("");
    setSort("newest");
  }

  return (
    <section className="min-h-screen bg-[#F6F1E4] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Heading + search */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={`${display} text-2xl font-extrabold text-[#17193B]`}>
            Papers
          </h2>

          <div className="relative w-full sm:max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#17193B]/50" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, university, or course code"
              aria-label="Search papers"
              className="w-full rounded-full border border-[#17193B]/15 bg-white py-2.5 pl-10 pr-4 text-sm text-[#17193B] outline-none transition placeholder:text-[#17193B]/40 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <FilterSelect
            label="Filter by university"
            value={universityId}
            onChange={handleUniversityChange}
          >
            <option value="">All universities</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Filter by course code"
            value={courseCode}
            onChange={setCourseCode}
          >
            <option value="">All course codes</option>
            {courseCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Filter by year"
            value={year}
            onChange={setYear}
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Sort papers" value={sort} onChange={setSort}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A to Z</option>
          </FilterSelect>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-1 cursor-pointer text-xs font-semibold text-[#17193B]/60 underline underline-offset-2 transition-colors hover:text-[#17193B]"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Result count */}
        <p
          className="mb-5 min-h-4 text-xs text-[#17193B]/60"
          aria-live="polite"
        >
          {!loading &&
            !error &&
            `${visiblePapers.length} ${
              visiblePapers.length === 1 ? "paper" : "papers"
            } found`}
        </p>

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
          ) : visiblePapers.length === 0 ? (
            <div className="col-span-full py-10 text-center">
              <p className="text-sm text-[#17193B]/60">
                {papers.length === 0
                  ? universityId
                    ? "No papers uploaded for this university yet."
                    : "No papers uploaded yet."
                  : "No papers match your search or filters."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-3 cursor-pointer rounded-full border border-[#16202B] px-4 py-2 text-xs font-semibold text-[#16202B] transition-colors hover:bg-[#16202B] hover:text-[#F6F1E4]"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            visiblePapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                fallbackUniversity={selectedUniversityName}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default PaperPage;