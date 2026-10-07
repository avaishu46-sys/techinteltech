import { useEffect, useRef, useState } from "react";
import {
  Send,
  CheckCircle,
  ArrowRight,
  LoaderCircle,
  ShieldAlert,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createNewsletterSubscription } from "../services/newsletter";

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LdwT-MtAAAAADhOUuFkUuDtklE2Mx4wuVYwkSb4";
const CONTACT_API_URL =
  (import.meta.env.DEV && import.meta.env.VITE_CONTACT_API_URL) ||
  `${import.meta.env.BASE_URL}api/contact.php`;

let recaptchaScriptPromise;

function loadRecaptcha() {
  if (window.grecaptcha?.render) {
    return Promise.resolve(window.grecaptcha);
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?render=explicit&hl=en";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (!window.grecaptcha) {
          reject(new Error("Google reCAPTCHA could not be initialized."));
          return;
        }

        window.grecaptcha.ready(() => resolve(window.grecaptcha));
      };
      script.onerror = () =>
        reject(new Error("Google reCAPTCHA could not be loaded."));
      document.head.appendChild(script);
    }).catch((error) => {
      recaptchaScriptPromise = null;
      throw error;
    });
  }

  return recaptchaScriptPromise;
}

function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [isVerifying, setIsVerifying] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionResult, setSubscriptionResult] = useState(null);
  const captchaContainerRef = useRef(null);
  const captchaWidgetId = useRef(null);

  useEffect(() => {
    if (status !== "verification" || !RECAPTCHA_SITE_KEY) return undefined;

    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !captchaContainerRef.current) return;

        captchaWidgetId.current = grecaptcha.render(captchaContainerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "light",
          callback: (token) => {
            setRecaptchaToken(token);
            setRecaptchaError("");
          },
          "expired-callback": () => {
            setRecaptchaToken("");
            setRecaptchaError("The verification expired. Please try again.");
          },
          "error-callback": () => {
            setRecaptchaToken("");
            setRecaptchaError(
              "Verification could not be completed. Check your connection and try again."
            );
          },
        });
      })
      .catch((error) => {
        if (!cancelled) {
          setRecaptchaError(error.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRecaptchaToken("");
    setRecaptchaError("");
    setStatus("verification");
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    if (!recaptchaToken) return;

    setIsVerifying(true);
    setRecaptchaError("");

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token: recaptchaToken }),
      });
      const responseText = await response.text();
      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            `The contact endpoint returned an unreadable response (HTTP ${response.status}). Check that the PHP endpoint is deployed at ${CONTACT_API_URL}.`
          );
        }
      } else {
        throw new Error(
          `The contact endpoint returned an empty response (HTTP ${response.status}). If testing locally, point VITE_CONTACT_API_URL to your deployed PHP endpoint and restart Vite.`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Verification failed. Please try again."
        );
      }

      if (result.submitted !== true) {
        throw new Error(
          result.message || "The server did not confirm your message submission."
        );
      }

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
      setStatus("success");
    } catch (error) {
      setStatus("verification");
      setRecaptchaToken("");
      setRecaptchaError(
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again."
      );
      if (
        captchaWidgetId.current !== null &&
        window.grecaptcha?.reset
      ) {
        window.grecaptcha.reset(captchaWidgetId.current);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (isSubscribing) return;

    setIsSubscribing(true);
    setSubscriptionResult(null);
    try {
      const result = await createNewsletterSubscription(subscribeEmail);
      setSubscriptionResult(result);
      setSubscribeEmail("");
    } catch (error) {
      setSubscriptionResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not subscribe you. Please try again.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-2xl border border-slate-100 text-center"
          >
            <div className="bg-teal-50 px-6 py-10 sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <CheckCircle size={30} className="text-teal-600" />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
                You did the right thing!
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                You passed the human check. Thanks for taking the time to get
                in touch with TechIntel.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-10">
              <p className="text-sm font-semibold leading-6 text-slate-800">
                Join 15k+ readers who scroll, swipe &amp; soak up our tech
                bytes!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubscriptionResult(null);
                  setSubscribeEmail("");
                  setSubscribeOpen(true);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25"
              >
                Subscribe now
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 block w-full text-sm font-medium text-slate-500 transition hover:text-teal-700 focus:outline-none focus-visible:underline"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : status === "verification" ? (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[390px] flex-col justify-center"
          >
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                One quick check
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Almost there
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Please confirm you’re human before continuing.
              </p>
            </div>

            <form onSubmit={handleVerification} className="space-y-6">
              <div className="min-h-[78px]">
                {RECAPTCHA_SITE_KEY ? (
                  <div ref={captchaContainerRef} />
                ) : (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-5 text-amber-900"
                  >
                    <ShieldAlert
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />
                    <p>
                      Human verification is not configured. Add the Google
                      reCAPTCHA site key to enable this form.
                    </p>
                  </div>
                )}
              </div>

              {recaptchaError && (
                <p role="alert" className="text-sm text-red-700">
                  {recaptchaError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/15 sm:flex-1"
                >
                  Back to message
                </button>
                <button
                  type="submit"
                  disabled={!recaptchaToken || isVerifying}
                  className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                >
                  {isVerifying ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="mr-2 inline animate-spin"
                      />
                      Verifying...
                    </>
                  ) : (
                    "Verify & continue"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* First name */}
              <div>
                <label htmlFor="first_name" className="mb-2 block text-sm font-semibold text-slate-700">
                  First Name *
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                  maxLength={100}
                  required
                  className={inputClasses}
                />
              </div>

              {/* Last name */}
              <div>
                <label htmlFor="last_name" className="mb-2 block text-sm font-semibold text-slate-700">
                  Last Name *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                  maxLength={100}
                  required
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Work Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  maxLength={255}
                  required
                  className={inputClasses}
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  maxLength={255}
                  className={inputClasses}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  maxLength={50}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                How can we help? *
              </label>

              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us a little about your requirements..."
                maxLength={10000}
                required
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Send Message
              <Send
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <p className="text-center text-xs leading-5 text-slate-400">
              By submitting this form, you agree to be contacted by the
              TechIntel team regarding your enquiry.
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {subscribeOpen && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isSubscribing) {
                setSubscribeOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-subscribe-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-9"
            >
              <button
                type="button"
                onClick={() => setSubscribeOpen(false)}
                aria-label="Close subscribe popup"
                disabled={isSubscribing}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50"
              >
                <X size={18} />
              </button>

              {subscriptionResult ? (
                <div className="py-4 text-center">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                      subscriptionResult.status === "error"
                        ? "bg-red-50 text-red-600"
                        : "bg-teal-50 text-teal-600"
                    }`}
                  >
                    {subscriptionResult.status === "error" ? (
                      <ShieldAlert size={28} />
                    ) : (
                      <CheckCircle size={28} />
                    )}
                  </div>
                  <h3
                    id="contact-subscribe-title"
                    className="mt-5 text-xl font-bold text-slate-950"
                  >
                    {subscriptionResult.status === "already_subscribed"
                      ? "Already subscribed"
                      : subscriptionResult.status === "subscribed"
                        ? "You’re subscribed!"
                        : "Subscription unsuccessful"}
                  </h3>
                  <p
                    role={subscriptionResult.status === "error" ? "alert" : "status"}
                    className="mt-2 text-sm leading-6 text-slate-600"
                  >
                    {subscriptionResult.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribeOpen(false)}
                    className="mt-6 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                    TechIntel Dispatch
                  </p>
                  <h3
                    id="contact-subscribe-title"
                    className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
                  >
                    Subscribe to our tech bytes
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Join 15k+ readers. Enter your email to subscribe to the
                    newsletter.
                  </p>
                  <form onSubmit={handleSubscribe} className="mt-6 space-y-4">
                    <label
                      htmlFor="contact-subscribe-email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>
                    <input
                      id="contact-subscribe-email"
                      type="email"
                      value={subscribeEmail}
                      onChange={(event) => setSubscribeEmail(event.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      disabled={isSubscribing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubscribing ? (
                        <>
                          <LoaderCircle size={16} className="animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;