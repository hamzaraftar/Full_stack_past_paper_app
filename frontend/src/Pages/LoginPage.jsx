import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";

// Same fonts as Home.jsx (see the <link> comment there).
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";
const body = "font-['Figtree',ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0895A]";

const inputClass =
  "w-full rounded-xl border-2 border-[#17193B]/15 bg-white px-4 py-3.5 text-base text-[#17193B] placeholder:text-[#17193B]/40 transition-colors hover:border-[#17193B]/30 focus:border-[#B0895A] focus:outline-none focus:ring-4 focus:ring-[#B0895A]/15 disabled:cursor-not-allowed disabled:opacity-60";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // request in progress
  const [success, setSuccess] = useState(false); // login worked
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await api.post("api/login/", {
        username: username,
        password: password,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      setSuccess(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.error(error.message);
      setErrorMsg("Wrong username or password. Try again.");
      setLoading(false); // let the user try again
    }
  };

  const locked = loading || success;

  return (
    <div
      className={`${body} flex min-h-screen flex-col items-center justify-center bg-[#F6F1E4] px-6 py-12 text-[#17193B]`}
    >
      {/* Logo */}
      <Link
        to="/"
        className={`mb-8 flex items-center gap-2.5 rounded-lg ${focusRing}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16202B] text-[#F6F1E4]">
          {/* stacked-papers mark */}
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

        <div className="relative rounded-3xl border border-[#17193B]/10 bg-white p-8 shadow-sm sm:p-10">
          <h1 className={`${display} text-4xl font-extrabold tracking-tight`}>
            Welcome back
          </h1>
          <p className="mt-2 text-[#17193B]/70">
            Log in to get back to your papers.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={locked}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={locked}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={locked}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#17193B]/50 transition-colors hover:text-[#17193B] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                      <path d="M9.4 5.5A9.9 9.9 0 0 1 12 5.2c5.2 0 8.8 4.2 9.8 6.8a1.3 1.3 0 0 1 0 1c-.4 1-1.3 2.5-2.7 3.9M6.2 6.9C4.4 8.2 3 10.1 2.2 12a1.3 1.3 0 0 0 0 1c1 2.6 4.6 6.8 9.8 6.8 1.3 0 2.5-.2 3.6-.7" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M2.2 12a1.3 1.3 0 0 1 0-1c1-2.6 4.6-6.8 9.8-6.8s8.8 4.2 9.8 6.8a1.3 1.3 0 0 1 0 1c-1 2.6-4.6 6.8-9.8 6.8s-8.8-4.2-9.8-6.8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-[#A3432E]/25 bg-[#A3432E]/[0.06] px-4 py-3 text-sm font-medium text-[#8A3624]"
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
                <span>Login successful! Taking you to your papers…</span>
              </div>
            )}

            <button
              type="submit"
              disabled={locked}
              className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#16202B] px-8 py-4 text-base font-semibold text-[#F6F1E4] shadow-lg shadow-[#16202B]/20 transition-colors hover:bg-[#0F1720] active:bg-[#0A1017] disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
            >
              {/* Logging-in indicator (spinner) */}
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
              {success ? "Logged in" : loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#17193B]/70">
            New here?{" "}
            <Link
              to="/signup"
              className={`rounded font-semibold text-[#B0895A] underline decoration-2 underline-offset-4 hover:text-[#96703F] ${focusRing}`}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
