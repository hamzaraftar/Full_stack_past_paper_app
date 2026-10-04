import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Same fonts as LoginPage.jsx (see the <link> comment there).
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";
const body = "font-['Figtree',ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0895A]";

const inputClass =
  "w-full rounded-xl border-2 border-[#17193B]/15 bg-white px-4 py-3.5 text-base text-[#17193B] placeholder:text-[#17193B]/40 transition-colors hover:border-[#17193B]/30 focus:border-[#B0895A] focus:outline-none focus:ring-4 focus:ring-[#B0895A]/15 disabled:cursor-not-allowed disabled:opacity-60";

// Handles plain arrays and DRF pagination ({ results: [] })
function toList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

// Turns DRF errors like { course_code: ["This field is required."] }
// into "course_code: This field is required."
function describeError(data) {
  if (!data) return "";
  if (typeof data === "string") return data.length < 200 ? data : "";
  if (data.detail) return String(data.detail);

  return Object.entries(data)
    .map(([field, msg]) => {
      const text = Array.isArray(msg) ? msg.join(" ") : String(msg);
      return field === "non_field_errors" ? text : `${field}: ${text}`;
    })
    .join(" | ");
}

function UploadPage() {
  const [title, setTitle] = useState("");
  const [universityId, setUniversityId] = useState(""); // selected university id (FK)
  const [courseCode, setCourseCode] = useState("");
  const [file, setFile] = useState(null); // File object, not a string
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // University dropdown data
  const [universities, setUniversities] = useState([]);
  const [uniLoading, setUniLoading] = useState(true);
  const [uniError, setUniError] = useState(false);
  const [uniReload, setUniReload] = useState(0); // bump to retry

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchUniversities() {
      try {
        setUniLoading(true);
        setUniError(false);

        const response = await api.get("api/university/");

        if (!cancelled) setUniversities(toList(response.data));
      } catch (err) {
        console.error("Couldn't load universities:", err);
        if (!cancelled) setUniError(true);
      } finally {
        if (!cancelled) setUniLoading(false);
      }
    }

    fetchUniversities();

    return () => {
      cancelled = true;
    };
  }, [uniReload]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setFileName(selected ? selected.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title || !courseCode || !universityId || !file) {
      setErrorMsg("Fill in every field and attach a file before uploading.");
      return;
    }

    setLoading(true);

    // File uploads need FormData, not a plain JSON object.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("course_code", courseCode);
    formData.append("university_id", universityId); // serializer expects university_id
    formData.append("file", file);

    try {
      await api.post("api/papers/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (error) {
      // Django (DRF) sends the reason in error.response.data
      console.error(
        "Upload failed:",
        error.response?.status,
        error.response?.data,
      );
      setErrorMsg(
        describeError(error.response?.data) ||
          "Couldn't upload that paper. Check the file and try again.",
      );
      setLoading(false);
    }
  };

  const locked = loading || success;

  return (
    <div
      className={`${body} flex min-h-screen flex-col items-center justify-center bg-[#F6F1E4] px-6 py-12 text-[#17193B]`}
    >
      {/* Card with offset colour block behind it */}
      <div className="relative w-full max-w-md pb-4 pr-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#B0895A]"
        />

        <div className="relative rounded-3xl border border-[#17193B]/10 bg-white p-8 shadow-sm sm:p-10">
          <h1 className={`${display} text-4xl font-extrabold tracking-tight`}>
            Upload a paper
          </h1>
          <p className="mt-2 text-[#17193B]/70">
            Add your past paper to the vault — it'll be there for the next
            student who needs it.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Data Structures"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={locked}
                className={inputClass}
              />
            </div>

            {/* Course code (right after title) */}
            <div>
              <label
                htmlFor="course_code"
                className="mb-2 block text-sm font-semibold"
              >
                Course code
              </label>
              <input
                id="course_code"
                type="text"
                placeholder="e.g. CS301"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                disabled={locked}
                className={inputClass}
              />
            </div>

            {/* University dropdown */}
            <div>
              <label
                htmlFor="university"
                className="mb-2 block text-sm font-semibold"
              >
                University / Institution
              </label>

              <div className="relative">
                <select
                  id="university"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  disabled={locked || uniLoading || uniError}
                  className={`${inputClass} cursor-pointer appearance-none pr-11 ${
                    universityId ? "" : "text-[#17193B]/40"
                  }`}
                >
                  <option value="">
                    {uniLoading
                      ? "Loading universities…"
                      : uniError
                        ? "Couldn't load universities"
                        : "Select your university"}
                  </option>

                  {universities.map((u) => (
                    <option key={u.id} value={u.id} className="text-[#17193B]">
                      {u.name}
                    </option>
                  ))}
                </select>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#17193B]/60"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              {uniError && (
                <p className="mt-2 text-xs text-[#8A3624]">
                  Universities didn't load.{" "}
                  <button
                    type="button"
                    onClick={() => setUniReload((n) => n + 1)}
                    className="cursor-pointer font-semibold underline underline-offset-2"
                  >
                    Try again
                  </button>
                </p>
              )}

              {!uniLoading && !uniError && universities.length === 0 && (
                <p className="mt-2 text-xs text-[#17193B]/60">
                  No universities available yet. Ask an admin to add one.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="file"
                className="mb-2 block text-sm font-semibold"
              >
                File
              </label>
              <label
                htmlFor="file"
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#17193B]/20 bg-[#F6F1E4]/50 px-4 py-8 text-center transition-colors hover:border-[#B0895A] ${
                  locked ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-[#B0895A]"
                  aria-hidden="true"
                >
                  <path d="M12 15V4M7 9l5-5 5 5" />
                  <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
                </svg>
                <span className="text-sm font-medium text-[#17193B]">
                  {fileName || "Click to choose a PDF"}
                </span>
                <span className="text-xs text-[#17193B]/50">
                  Only PDF up to 20MB
                </span>
                <input
                  id="file"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={locked}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-[#A3432E]/25 bg-[#A3432E]/6 px-4 py-3 text-sm font-medium text-[#8A3624]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5" />
                  <path d="M12 16h.01" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-[#1B7F4B]/30 bg-[#E6F6EC] px-4 py-3 text-sm font-medium text-[#14603A]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12.5l3 3 5-6" />
                </svg>
                <span>Paper uploaded! Thanks for helping other students.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={locked}
              className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#16202B] px-8 py-4 text-base font-semibold text-[#F6F1E4] shadow-lg shadow-[#16202B]/20 transition-colors hover:bg-[#0F1720] active:bg-[#0A1017] disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
            >
              {loading && !success && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="h-5 w-5 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 9 9" />
                </svg>
              )}
              {success ? "Uploaded" : loading ? "Uploading…" : "Upload paper"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
