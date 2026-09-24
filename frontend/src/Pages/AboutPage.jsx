import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

const display =
  "font-['Bricolage_Grotesque',ui-sans-serif,system-ui,sans-serif]";

function BookIcon({ className }) {
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
      <path d="M12 6.5c-1.5-1-4-1.5-6-1v13c2 0 4.5.5 6 1.5 1.5-1 4-1.5 6-1.5V5.5c-2-.5-4.5 0-6 1z" />
    </svg>
  );
}

function UploadIcon({ className }) {
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
      <path d="M12 19V6M6 12l6-6 6 6" />
      <path d="M4 19h16" />
    </svg>
  );
}

function UsersIcon({ className }) {
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
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" />
      <path d="M16 8.2a3 3 0 1 1 3.5 5.7" />
      <path d="M21 20c0-2.5-1.7-4.6-4-5.3" />
    </svg>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-[#17193B]/10 bg-white p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F1E4] text-[#B0895A]">
        {icon}
      </span>

      <h3 className={`${display} mt-4 text-lg font-bold text-[#17193B]`}>
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-[#17193B]/70">
        {text}
      </p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F1E4]">
      <Navebar />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#B0895A]">
              About PaperVault
            </span>

            <h1
              className={`${display} mt-4 text-3xl font-extrabold text-[#17193B] sm:text-4xl`}
            >
              Every past paper, shared by students who've sat the same exams.
            </h1>

            <p className="mt-4 text-[#17193B]/70">
              PaperVault started as a simple idea: exam prep shouldn't mean
              digging through group chats and broken links. We built a single
              place where students can upload, search, and download past
              papers from their university or exam board — for free, by the
              community, for the community.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3">
            <ValueCard
              icon={<BookIcon className="h-5 w-5" />}
              title="One vault, every subject"
              text="No more hunting across five different WhatsApp groups. Search by subject, university, or year and find what you need in seconds."
            />

            <ValueCard
              icon={<UploadIcon className="h-5 w-5" />}
              title="Built by students, for students"
              text="Every paper on PaperVault was uploaded by someone who sat that same exam. Got a paper others could use? Upload it in a couple of clicks."
            />

            <ValueCard
              icon={<UsersIcon className="h-5 w-5" />}
              title="Free, always"
              text="We believe exam prep resources should be accessible to everyone. No paywalls, no subscriptions — just a shared library that grows with every upload."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl rounded-2xl bg-[#16202B] px-8 py-10 text-center">
            <h2
              className={`${display} text-2xl font-extrabold text-[#F6F1E4]`}
            >
              Have a paper others could use?
            </h2>

            <p className="mt-2 text-sm text-[#F6F1E4]/70">
              Upload it and help the next student who's stuck where you once
              were.
            </p>

            <a
              href="/upload"
              className="mt-6 inline-block rounded-full bg-[#F6F1E4] px-6 py-2.5 text-sm font-semibold text-[#16202B] transition-colors hover:bg-white"
            >
              Upload a paper
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;