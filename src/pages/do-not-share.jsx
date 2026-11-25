import { useEffect, useState } from "react";
import SectionLabel from "../components/SectionLabel";

function DoNotShare() {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Load countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load countries");
        }
        return res.json();
      })
      .then((data) => {
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));

        setCountries(sortedCountries);
      })
      .catch(() => {
        setCountries([
          "Australia",
          "Canada",
          "India",
          "United Kingdom",
          "United States",
        ]);
      })
      .finally(() => {
        setLoadingCountries(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please provide your first name.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please provide your last name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please provide a valid email.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please provide company name.";
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Please provide job title.";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country.";
    }

    if (!formData.agreement) {
      newErrors.agreement = "You must agree before submitting.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmissionError("");

    try {
      const body = new URLSearchParams({
        "form-name": "privacy-request",
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        country: formData.country,
        agreement: formData.agreement ? "Yes" : "No",
        "bot-field": "",
      });
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("We couldn't save your request. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        country: "",
        agreement: false,
      });
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn't save your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>

      <main className="bg-white text-slate-900">

        {/* Hero */}
        <section className="bg-slate-950 pt-40 pb-20 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <SectionLabel>Privacy Choices</SectionLabel>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Do Not Share or Sell My Personal Information
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              You can use this form to submit a request regarding the sale or
              sharing of your personal information.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl">

            {!submitted ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">

                <div className="mb-10">
                  <SectionLabel>Privacy Request</SectionLabel>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    Submit your request
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    Please provide the information below so that we can
                    process your privacy request.
                  </p>
                </div>

                <form
                  name="privacy-request"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value="privacy-request" />
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />
                  <div className="grid gap-6 sm:grid-cols-2">

                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        First Name<span className="text-red-500">*</span>
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                          errors.firstName
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      />

                      {errors.firstName && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Last Name<span className="text-red-500">*</span>
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                          errors.lastName
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      />

                      {errors.lastName && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Email<span className="text-red-500">*</span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                          errors.email
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      />

                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-950"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Company Name<span className="text-red-500">*</span>
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                          errors.company
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      />

                      {errors.company && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Job Title */}
                    <div>
                      <label
                        htmlFor="jobTitle"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Job Title<span className="text-red-500">*</span>
                      </label>

                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Enter your job title"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                          errors.jobTitle
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      />

                      {errors.jobTitle && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Country<span className="text-red-500">*</span>
                      </label>

                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={loadingCountries}
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                          errors.country
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-slate-950"
                        }`}
                      >
                        <option value="">
                          {loadingCountries
                            ? "Loading countries..."
                            : "Select Country*"}
                        </option>

                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>

                      {errors.country && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Agreement */}
                    <div className="sm:col-span-2">
                      <div className="flex items-start gap-3">
                        <input
                          id="agreement"
                          name="agreement"
                          type="checkbox"
                          checked={formData.agreement}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-slate-300 accent-slate-950"
                        />

                        <label
                          htmlFor="agreement"
                          className="text-sm leading-6 text-slate-600"
                        >
                          I agree to provide my contact information and allow
                          communication as per the Privacy Policy.
                          <span className="text-red-500"> *</span>
                        </label>
                      </div>

                      {errors.agreement && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.agreement}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    {submissionError && (
                      <p
                        role="alert"
                        className="text-sm text-red-600 sm:col-span-2"
                      >
                        {submissionError}
                      </p>
                    )}

                    <div className="flex justify-center pt-4 sm:col-span-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="mr-2">✈</span>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Message */
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-16 text-center shadow-sm sm:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Thank you!
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Your privacy request has been submitted successfully.
                  Our team will review the information provided and process
                  your request.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Submit Another Request
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Information Section */}
        <section className="border-t border-slate-200 bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <SectionLabel>Your Privacy</SectionLabel>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Your privacy choices matter
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              TechIntel respects your privacy and provides this form to help
              you exercise applicable privacy rights regarding your personal
              information. Please provide accurate information so that we can
              properly identify and process your request.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              If you have additional questions about how TechIntel handles
              personal information, please contact us at{" "}
              <a
                href="mailto:contact@techintel.tech"
                className="font-medium text-slate-950 underline underline-offset-4"
              >
                contact@techintel.tech
              </a>
              .
            </p>
          </div>
        </section>

      </main>

    </>
  );
}

export default DoNotShare;