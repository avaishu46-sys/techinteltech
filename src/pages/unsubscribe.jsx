
import { useState } from "react";
import SectionLabel from "../components/SectionLabel";

const UNSUBSCRIBE_API_URL =
  (import.meta.env.DEV && import.meta.env.VITE_UNSUBSCRIBE_API_URL) ||
  `${import.meta.env.BASE_URL}api/unsubscribe.php`;

function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(UNSUBSCRIBE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err.message === "Failed to fetch"
          ? "We couldn't reach the server. Please try again in a moment."
          : err.message
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <section className="relative overflow-hidden bg-white pt-32 pb-14 sm:pt-36 sm:pb-16">
        {/* Soft decorative background */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-8">
          {/* <div className="flex justify-center">
            <SectionLabel>Email preferences</SectionLabel>
          </div> */}

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            {/* <span className="h-px w-8 bg-teal-500" /> */}

            {/* <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              Manage your preferences
            </span> */}

            {/* <span className="h-px w-8 bg-teal-500" /> */}
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
            Unsubscribe
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            We're sorry to see you go. Enter your email address below to record
            your unsubscribe request.
          </p>
        </div>
      </section>

      {/* =========================
          FORM SECTION
      ========================== */}
      <section className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl">

            {/* Main Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]">
              {/* Teal accent */}
              <div className="h-1 w-full bg-teal-500" />

              <div className="p-7 sm:p-10 lg:p-11">
                {status === "success" ? (
                  /* =========================
                     SUCCESS STATE
                  ========================== */
                  <div
                    role="status"
                    aria-live="polite"
                    className="py-5 text-center"
                  >
                    {/* Success Icon */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/20">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>

                    <h2 className="mt-7 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      Your request has been recorded
                    </h2>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                      Your email address has been added to our unsubscribe
                      requests. If you receive email through another service,
                      that mailing list may need to be updated separately.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setMessage("");
                      }}
                      className="mt-7 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
                    >
                      Unsubscribe another email

                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 10h12" />
                        <path d="M11 5l5 5-5 5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* =========================
                     FORM
                  ========================== */
                  <form onSubmit={handleSubmit}>
                    {/* Email Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                        />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>

                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      Want to unsubscribe?
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      Enter the email address you'd like removed from our
                      mailing list.
                    </p>

                    {/* Email Input */}
                    <div className="mt-8">
                      <label
                        htmlFor="unsubscribe-email"
                        className="text-sm font-semibold text-slate-800"
                      >
                        Email address
                      </label>

                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect
                              x="3"
                              y="5"
                              width="18"
                              height="14"
                              rx="2"
                            />
                            <path d="m3 7 9 6 9-6" />
                          </svg>
                        </div>

                        <input
                          id="unsubscribe-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);

                            if (status === "error") {
                              setStatus("idle");
                              setMessage("");
                            }
                          }}
                          aria-describedby={
                            status === "error"
                              ? "unsubscribe-error"
                              : undefined
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                      <div
                        id="unsubscribe-error"
                        role="alert"
                        className="mt-4 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-5 w-5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8v4" />
                          <path d="M12 16h.01" />
                        </svg>

                        <span>{message}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/15 transition hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              className="opacity-30"
                              stroke="currentColor"
                              strokeWidth="3"
                            />

                            <path
                              d="M21 12a9 9 0 0 0-9-9"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>

                          Unsubscribing…
                        </>
                      ) : (
                        <>
                          Unsubscribe

                          <svg
                            viewBox="0 0 20 20"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M4 10h12" />
                            <path d="M11 5l5 5-5 5" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                      You can change your email preferences again at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
              <p className="text-sm text-slate-600">
                Having trouble unsubscribing?
              </p>

              <a
                href="mailto:contact@techintel.tech"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition hover:text-teal-500"
              >
                contact@techintel.tech

                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 15 15 5" />
                  <path d="M7 5h8v8" />
                </svg>
              </a>
            </div>

            {/* Privacy Note */}
            <p className="mt-6 text-center text-xs leading-6 text-slate-400">
              Your email address will only be used to process your
              unsubscribe request.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Unsubscribe;
