import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SectionLabel from "../components/SectionLabel";

const PRIVACY_POLICY_API_URL =
  import.meta.env.VITE_PRIVACY_POLICY_API_URL ||
  (import.meta.env.DEV
    ? `${import.meta.env.BASE_URL}api/privacy-policy.php`
    : "https://techintel.tech/api/privacy-policy.php");

function createStyledPolicyDocument(content) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body>
        ${content}
        <style>
          html body,
          html body * {
            font-family: "Poppins", ui-sans-serif, system-ui, sans-serif !important;
          }

          html body [data-custom-class],
          html body [data-custom-class] * {
            font-family: "Poppins", ui-sans-serif, system-ui, sans-serif !important;
          }

          html body > [data-custom-class="body"] {
            margin-top: -120px !important;
          }

          html body a,
          html body a * {
            color: #009689 !important;
          }

          html body [data-custom-class="link"],
          html body [data-custom-class="link"] * {
            color: #009689 !important;
          }

          html body a:hover,
          html body a:focus,
          html body a:hover *,
          html body a:focus *,
          html body [data-custom-class="link"]:hover,
          html body [data-custom-class="link"]:focus {
            color: #00796f !important;
          }

          html body ul li::marker,
          html body ol li::marker {
            color: #009689 !important;
          }
        </style>
      </body>
    </html>`;
}

function Privacy() {
  const policyFrameRef = useRef(null);
  const [policyContent, setPolicyContent] = useState("");
  const [policyFrameLoaded, setPolicyFrameLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPolicy() {
      try {
        const response = await fetch(
          PRIVACY_POLICY_API_URL,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`The privacy policy request failed (${response.status}).`);
        }

        const result = await response.json();
        if (typeof result.content !== "string" || result.content.length === 0) {
          throw new Error("The privacy policy response was invalid.");
        }

        if (active) {
          setPolicyContent(result.content);
          setPolicyFrameLoaded(false);
        }
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("Unable to load the privacy policy.", loadError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPolicy();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!policyFrameLoaded) return undefined;

    const frame = policyFrameRef.current;
    const policyDocument = frame?.contentDocument;
    if (!frame || !policyDocument?.documentElement || !policyDocument.body) {
      return undefined;
    }

    let active = true;
    const resizeFrame = () => {
      if (!active) return;
      const documentHeight = Math.max(
        policyDocument.documentElement.scrollHeight,
        policyDocument.body.scrollHeight,
      );
      frame.style.height = `${documentHeight}px`;
    };

    resizeFrame();
    const observer = new ResizeObserver(resizeFrame);
    observer.observe(policyDocument.documentElement);
    observer.observe(policyDocument.body);
    policyDocument.fonts?.ready.then(resizeFrame);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [policyContent, policyFrameLoaded]);

  return (
    <>
      <Navbar />

      <main>
        {/* =====================================================
            PRIVACY POLICY HEADER
        ====================================================== */}
        <section className="bg-slate-950 pt-40 text-white">
          <div className="mx-auto max-w-5xl px-6 pb-20 lg:px-8">

            <SectionLabel>
              Legal
            </SectionLabel>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 text-sm text-slate-400">
              Last updated: December 09, 2025
            </p>

          </div>
        </section>


        {/* =====================================================
            TERMLY PRIVACY POLICY
        ====================================================== */}
        <section className="bg-white pb-20 pt-8 lg:pb-28 lg:pt-12">
          <article className="mx-auto max-w-5xl px-6 lg:px-8">

            {/* =================================================
                LOADING STATE
            ================================================== */}
            {loading && (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">

                  <div
                    className="
                      mx-auto
                      mb-5
                      h-10
                      w-10
                      animate-spin
                      rounded-full
                      border-4
                      border-slate-200
                      border-t-slate-950
                    "
                  />

                  <p className="text-sm text-slate-500">
                    Loading Privacy Policy...
                  </p>

                </div>
              </div>
            )}


            {/* =================================================
                ERROR STATE
            ================================================== */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                <h2 className="text-xl font-bold text-slate-950">
                  Privacy Policy could not be loaded
                </h2>

                <p className="mt-3 text-slate-600">
                  We were unable to load the Privacy Policy at this time.
                  Please refresh the page or try again later.
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="
                    mt-6
                    rounded-full
                    bg-slate-950
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Try Again
                </button>

              </div>
            )}


            {/* =================================================
                EXACT TERMLY POLICY
                Original Termly ID:
                d57b5309-8c31-4c47-9b42-9752e9504c41
            ================================================== */}
            {!loading && !error && policyContent && (
              <iframe
                ref={policyFrameRef}
                title="Privacy Policy"
                srcDoc={createStyledPolicyDocument(policyContent)}
                sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setPolicyFrameLoaded(true)}
                className="block w-full border-0"
                style={{ height: 400 }}
              />
            )}

          </article>
        </section>
      </main>


    </>
  );
}

export default Privacy;