import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

// Same fonts as Home.jsx (see the <link> comment there).
const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";
const body = "font-['Figtree',ui-sans-serif,system-ui,sans-serif]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B0895A]";

const inputClass =
  "w-full rounded-xl border-2 border-[#17193B]/15 bg-white px-4 py-3 text-base text-[#17193B] placeholder:text-[#17193B]/40 transition-colors hover:border-[#17193B]/30 focus:border-[#B0895A] focus:outline-none focus:ring-4 focus:ring-[#B0895A]/15 disabled:cursor-not-allowed disabled:opacity-60";

function EyeToggle({ shown, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={shown ? "Hide password" : "Show password"}
      className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#17193B]/50 transition-colors hover:text-[#17193B] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
    >
      {shown ? (
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
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // request in progress
  const [success, setSuccess] = useState(false); // register worked
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("api/users/signup/", {
        username: username,
        password: password,
        email: email,
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error.message);
      setErrorMsg("Something went wrong. Try again.");
      setLoading(false); // let the user try again
    }
  };

  const locked = loading || success;

  return (
    <div
      className={`${body} flex h-screen flex-col items-center justify-center overflow-hidden bg-[#F6F1E4] px-6 py-4 text-[#17193B]`}
    >
      {/* Card with offset colour block behind it */}
      <div className="relative w-full max-w-md pb-4 pr-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#B0895A]"
        />

        <div className="relative rounded-3xl border border-[#17193B]/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className={`${display} text-3xl font-extrabold tracking-tight`}>
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[#17193B]/70">
            Free to use. Set up in under a minute.
          </p>

          <form onSubmit={handleRegister} className="mt-5 space-y-3.5">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-semibold"
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
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={locked}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold"
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
                <EyeToggle
                  shown={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={locked}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-semibold"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={locked}
                  className={`${inputClass} pr-12`}
                />
                <EyeToggle
                  shown={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  disabled={locked}
                />
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-[#A3432E]/25 bg-[#A3432E]/6 px-4 py-2.5 text-sm font-medium text-[#8A3624]"
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
                className="flex items-start gap-3 rounded-xl border border-[#1B7F4B]/30 bg-[#E6F6EC] px-4 py-2.5 text-sm font-medium text-[#14603A]"
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
                <span>Account created! Taking you to the login page…</span>
              </div>
            )}

            <button
              type="submit"
              disabled={locked}
              className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#16202B] px-8 py-3.5 text-base font-semibold text-[#F6F1E4] shadow-lg shadow-[#16202B]/20 transition-colors hover:bg-[#0F1720] active:bg-[#0A1017] disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
            >
              {/* Registering indicator (spinner) */}
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
              {success
                ? "Account created"
                : loading
                  ? "Creating account…"
                  : "Register"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#17193B]/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`cursor-pointer rounded font-semibold text-[#B0895A] underline decoration-2 underline-offset-4 hover:text-[#96703F] ${focusRing}`}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
