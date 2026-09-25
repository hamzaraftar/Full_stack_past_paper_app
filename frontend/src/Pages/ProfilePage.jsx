import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

// Django backend
const FILE_BASE_URL = "http://localhost:8000";

function ProfilePage() {
  // ==========================================
  // STATE
  // ==========================================

  const [user, setUser] = useState(null);
  const [papers, setPapers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // GET USER + PAPERS
  // ==========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in user information
        const userResponse = await api.get("api/users/me/");

        // Get logged-in user's papers
        const papersResponse = await api.get("api/profile/");

        console.log("User:", userResponse.data);
        console.log("Papers:", papersResponse.data);

        setUser(userResponse.data);

        // In case API returns array directly
        setPapers(papersResponse.data);
      } catch (err) {
        console.error("Profile error:", err);

        setError(err.response?.data?.detail || "Couldn't load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // DELETE PAPER
  // ==========================================

  const handleDelete = async (paperId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paper?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(paperId);

      // DELETE
      await api.delete(`api/papers/${paperId}/`);

      // Remove paper from UI
      setPapers((currentPapers) =>
        currentPapers.filter((paper) => paper.id !== paperId),
      );
    } catch (err) {
      console.error("Delete error:", err);

      alert(err.response?.data?.detail || "Couldn't delete the paper.");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F1E4]">
        <main className="mx-auto max-w-6xl px-6 py-12">
          {/* Profile skeleton */}

          <section className="rounded-2xl border border-[#ddd6c8] bg-[#fbf8f1] p-8">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 animate-pulse rounded-full bg-[#eee8dc]" />

              <div className="space-y-3">
                <div className="h-4 w-28 animate-pulse rounded bg-[#eee8dc]" />

                <div className="h-8 w-52 animate-pulse rounded bg-[#eee8dc]" />

                <div className="h-4 w-40 animate-pulse rounded bg-[#eee8dc]" />
              </div>
            </div>
          </section>

          {/* Paper skeletons */}

          <section className="mt-12">
            <div className="mb-7">
              <div className="h-4 w-32 animate-pulse rounded bg-[#eee8dc]" />

              <div className="mt-2 h-9 w-48 animate-pulse rounded bg-[#eee8dc]" />
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ddd6c8] bg-[#fbf8f1] p-6"
                >
                  <div className="h-11 w-11 animate-pulse rounded-xl bg-[#eee8dc]" />

                  <div className="mt-6 h-6 w-3/4 animate-pulse rounded bg-[#eee8dc]" />

                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#eee8dc]" />

                  <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-[#eee8dc]" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F1E4] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-[#A3432E]/20 bg-[#A3432E]/5 px-5 py-4 text-sm text-[#A3432E]">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // USER DATA
  // ==========================================

  const username = user?.username || user?.name || "Student";

  const email = user?.email || "No email available";

  const initial = username.charAt(0).toUpperCase();

  const joined = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F6F1E4] text-[#142033]">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* ======================================
            PROFILE HEADER
        ====================================== */}

        <section className="rounded-2xl border border-[#ddd6c8] bg-[#fbf8f1] p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* User information */}

            <div className="flex items-center gap-5">
              {/* Avatar */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#B0895A] text-2xl font-semibold text-white">
                {initial}
              </div>

              {/* Name + email */}

              <div>
                <p className="mb-1 text-sm font-medium text-[#A87845]">
                  Student profile
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#111C38]">
                  {username}
                </h1>

                <p className="mt-1 text-sm text-[#667085]">{email}</p>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-7 border-t border-[#e2dccf]" />

          {/* Profile details */}

          <div className="grid gap-5 sm:grid-cols-3">
            {/* Email */}

            <div>
              <p className="text-xs uppercase tracking-wider text-[#8a8f9a]">
                Email
              </p>

              <p className="mt-1 text-sm font-medium text-[#28344b]">{email}</p>
            </div>

            {/* Member since */}

            <div>
              <p className="text-xs uppercase tracking-wider text-[#8a8f9a]">
                Member since
              </p>

              <p className="mt-1 text-sm font-medium text-[#28344b]">
                {joined}
              </p>
            </div>

            {/* Paper count */}

            <div>
              <p className="text-xs uppercase tracking-wider text-[#8a8f9a]">
                Papers uploaded
              </p>

              <p className="mt-1 text-sm font-medium text-[#28344b]">
                {papers.length} {papers.length === 1 ? "paper" : "papers"}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================
            MY UPLOADS
        ====================================== */}

        <section className="mt-12">
          {/* Heading */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#A87845]">
                Your contribution
              </p>

              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#111C38]">
                My uploads
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#667085]">
                Papers you've shared with other students through PaperVault.
              </p>
            </div>

            {/* Upload button */}

            <Link
              to={"/upload"}
              type="button"
              className="w-fit rounded-full bg-[#142033] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202d42]"
            >
              ↑ Upload a paper
            </Link>
          </div>

          {/* ======================================
              PAPERS
          ====================================== */}

          {papers.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {papers.map((paper) => {
                // File URL

                const fileUrl = paper.file?.startsWith("http")
                  ? paper.file
                  : `${FILE_BASE_URL}${paper.file}`;

                // Year

                const year = new Date(paper.uploaded_at).getFullYear();

                // Uploaded date

                const uploadedDate = new Date(
                  paper.uploaded_at,
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={paper.id}
                    className={`group flex flex-col rounded-2xl border border-[#ddd6c8] bg-[#fbf8f1] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                      deletingId === paper.id
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    {/* =================================
                        CARD TOP
                    ================================= */}

                    <div className="flex items-start justify-between">
                      {/* File icon */}

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#142033] text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.7"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-8.25A2.25 2.25 0 0017.25 3.75h-6.879a2.25 2.25 0 00-1.591.659L5.409 7.78a2.25 2.25 0 00-.659 1.591v8.879a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25v-4.5z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 3.75v4.5h4.5"
                          />
                        </svg>
                      </div>

                      {/* Year */}

                      <span className="rounded-full bg-[#eee8dc] px-3 py-1 text-xs font-semibold text-[#596274]">
                        {year}
                      </span>
                    </div>

                    {/* =================================
                        CARD CONTENT
                    ================================= */}

                    <div className="mt-6 flex-1">
                      {/* Title */}

                      <h3 className="text-xl font-bold text-[#111c38] transition group-hover:text-[#a87845]">
                        {paper.title}
                      </h3>

                      {/* University */}

                      <p className="mt-2 text-sm leading-5 text-[#667085]">
                        {paper.university}
                      </p>

                      {/* Subject + PDF */}

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#eee8dc] px-3 py-1 text-xs font-medium text-[#596274]">
                          {paper.subject}
                        </span>

                        <span className="rounded-full bg-[#eee8dc] px-3 py-1 text-xs font-medium text-[#596274]">
                          PDF
                        </span>
                      </div>

                      {/* Uploaded date */}

                      <p className="mt-3 text-xs text-[#8a8f9a]">
                        Uploaded {uploadedDate}
                      </p>
                    </div>

                    {/* =================================
                        CARD BUTTONS
                    ================================= */}

                    <div className="mt-6 border-t border-[#e5dfd3] pt-5">
                      <div className="flex gap-2">
                        {/* VIEW */}

                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full bg-[#142033] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#202d42]"
                        >
                          View
                        </a>

                        {/* DOWNLOAD */}

                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const response = await fetch(fileUrl);

                              if (!response.ok) {
                                throw new Error("Download failed");
                              }

                              const blob = await response.blob();

                              const url = window.URL.createObjectURL(blob);

                              const link = document.createElement("a");

                              link.href = url;

                              link.download =
                                paper.file?.split("/").pop() || "paper.pdf";

                              document.body.appendChild(link);

                              link.click();

                              link.remove();

                              window.URL.revokeObjectURL(url);
                            } catch (error) {
                              console.error("Download failed:", error);

                              alert("Couldn't download the paper.");
                            }
                          }}
                          className="cursor-pointer flex-1 rounded-full border border-[#142033] px-4 py-2 text-center text-sm font-semibold text-[#142033] transition hover:bg-[#142033] hover:text-white"
                        >
                          Download
                        </button>
                      </div>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => handleDelete(paper.id)}
                        className="cursor-pointer mt-2 w-full rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        {deletingId === paper.id
                          ? "Deleting..."
                          : "Delete paper"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ======================================
               EMPTY STATE
            ====================================== */

            <div className="mt-7 rounded-2xl border border-dashed border-[#cfc7b8] bg-[#fbf8f1] px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eee8dc] text-[#142033]">
                ↑
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#111c38]">
                No papers uploaded yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#667085]">
                You haven't shared any papers yet. Upload one and help the next
                student who needs it.
              </p>

              <button
                type="button"
                className="mt-5 rounded-full bg-[#142033] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Upload a paper
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
