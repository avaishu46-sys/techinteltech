import SectionLabel from "../components/SectionLabel";

function Accessibility() {
  return (
    <>
      <main className="accessibility-page">
        {/* Hero */}
        <section className="bg-slate-950 pt-40 pb-20 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel>TRUST &amp; COMPLIANCE</SectionLabel>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Accessibility Statement
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              We are committed to ensuring that our website and services are
              accessible to people with disabilities.
            </p>

            <p className="mt-5 text-sm text-slate-400">
              Last updated: September 2026
            </p>
          </div>
        </section>

        {/* Accessibility Content */}
        <section className="accessibility-content-section">
          <div className="container">
            <div className="accessibility-layout">
              {/* Main Content */}
              <article className="accessibility-content">
                <div className="legal-intro">
                  <p>
                    This statement applies to the{" "}
                    <a
                      href="https://techintel.tech/"
                      target="_blank"
                      rel="noopener noreferrer" 
                    >
                      https://techintel.tech/
                    </a>{" "}
                    website.
                  </p>
                </div>

                {/* Our Commitment */}
                <section className="legal-section">
                  <h2>Our Commitment</h2>

                  <p>
                    TechIntel Tech is committed to ensuring our services are
                    accessible to people with disabilities.
                  </p>

                  <p>
                    We aim to conform with the European standard{" "}
                    <strong>EN 301 549 v3.2.1</strong>.
                  </p>

                  <p>
                    This accessibility statement forms an integral part of our{" "}
                    <strong>Terms and Conditions</strong>.
                  </p>

                  <p>
                    <a
                      href="https://techintel.tech/terms-of-use-terms-and-conditions.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View our Terms and Conditions
                    </a>
                  </p>
                </section>

                {/* Accessibility Features */}
                <section className="legal-section">
                  <h2>Accessibility Features</h2>

                  <p>
                    We aim to make our website and digital services accessible
                    and usable for people with disabilities.
                  </p>

                  <p>Where applicable, users should be able to:</p>

                  <ul>
                    <li>
                      Navigate the website using a keyboard or other assistive
                      technologies.
                    </li>
                    <li>
                      Access website content using commonly used screen readers.
                    </li>
                    <li>
                      Navigate pages using clear headings and meaningful
                      structure.
                    </li>
                    <li>
                      Identify links, buttons, forms, and other interactive
                      elements.
                    </li>
                    <li>
                      Access information without relying exclusively on color.
                    </li>
                    <li>
                      Resize content and use browser accessibility features
                      where supported.
                    </li>
                  </ul>
                </section>

                {/* Conformance Status */}
                <section className="legal-section">
                  <h2>Conformance Status</h2>

                  <div className="status-box">
                    <div className="status-icon">✓</div>

                    <div>
                      <strong>Status</strong>
                      <p>
                        Fully compliant with{" "}
                        <strong>EN 301 549 v3.2.1</strong>.
                      </p>
                    </div>
                  </div>

                  <p>
                    We conducted our most recent accessibility evaluation in{" "}
                    <strong>December 2025</strong>.
                  </p>
                </section>

                {/* Preparation */}
                <section className="legal-section">
                  <h2>Preparation of This Statement</h2>

                  <p>
                    This statement was prepared on{" "}
                    <strong>09 December 2025</strong> and is reviewed{" "}
                    <strong>annually</strong> or when we make significant
                    service changes.
                  </p>

                  <p>
                    We maintain records of accessibility feedback and our
                    responses for regulatory compliance.
                  </p>
                </section>

                {/* Feedback */}
                <section className="legal-section">
                  <h2>Feedback and Contact Information</h2>

                  <p>
                    Please let us know if you experience accessibility barriers
                    using our services or need information in an alternative
                    format.
                  </p>

                  <div className="contact-card">
                    <div className="contact-item">
                      <span className="contact-label">Email</span>

                      <a href="mailto:contact@techintel.tech">
                        contact@techintel.tech
                      </a>

                      <small>
                        Please mark the subject line as "Accessibility".
                      </small>
                    </div>
                  </div>

                  <p className="response-text">
                    We respond to accessibility feedback within{" "}
                    <strong>__________</strong>.
                  </p>

                  <p>
                    You can also contact us by post:
                  </p>

                  <address>
                    <strong>TechIntel Tech</strong>
                    <br />
                    United States
                  </address>
                </section>

                {/* Enforcement */}
                <section className="legal-section">
                  <h2>Enforcement</h2>

                  <p>
                    If you're not satisfied with our response, you can contact
                    the enforcement authority in your country:
                  </p>

                  <div className="authority-list">
                    <div className="authority-item">
                      <span>Germany</span>

                      <a
                        href="https://www.bfdi.bund.de/EN/Service/Kontakt/kontakt_node.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BFIT-Bund
                      </a>
                    </div>

                    <div className="authority-item">
                      <span>France</span>

                      <a
                        href="https://www.defenseurdesdroits.fr/nous-contacter-355"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Défenseur des droits
                      </a>
                    </div>

                    <div className="authority-item">
                      <span>Ireland</span>

                      <a
                        href="https://nda.ie/accessibility"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        National Disability Authority
                      </a>
                    </div>

                    <div className="authority-item">
                      <span>Spain</span>

                      <a
                        href="https://www.rpdiscapacidad.gob.es/organismos/oadis.htm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OADIS
                      </a>
                    </div>

                    <div className="authority-item">
                      <span>Italy</span>

                      <a
                        href="https://www.agid.gov.it/it/ambiti-intervento/accessibilita-usabilita"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AgID
                      </a>
                    </div>
                  </div>

                  <p>
                    For other EU countries, contact your national consumer
                    protection authority.
                  </p>
                </section>

                {/* Closing */}
                <section className="accessibility-closing">
                  <p>
                    <em>
                      For questions about accessibility or this statement,
                      contact us using the details above.
                    </em>
                  </p>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="accessibility-sidebar">
                <div className="sidebar-card">
                  <span className="sidebar-label">
                    ACCESSIBILITY
                  </span>

                  <h3>
                    Building a more accessible digital experience.
                  </h3>

                  <p>
                    We continuously review our website and services to improve
                    accessibility and usability.
                  </p>

                  <a
                    href="mailto:contact@techintel.tech?subject=Accessibility"
                    className="sidebar-button"
                  >
                    Contact Accessibility Team
                  </a>
                </div>

                <div className="sidebar-card sidebar-card-light">
                  <span className="sidebar-label">
                    RELATED POLICIES
                  </span>

                  <div className="sidebar-links">
                    <a href="/privacy">
                      Privacy Policy
                      <span>→</span>
                    </a>

                    <a href="/cookie-policy">
                      Cookie Policy
                      <span>→</span>
                    </a>

                    <a href="/do-not-share">
                      Do Not Sell or Share My Info
                      <span>→</span>
                    </a>

                    <a href="/terms">
                      Terms & Conditions
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* Page Styles */}
      <style>{`
        .accessibility-page {
          background: #f7f9fc;
          min-height: 100vh;
          color: #1e293b;
          overflow-x: hidden;
        }

        .accessibility-page .container {
          width: min(100% - 48px, 1280px);
          margin-inline: auto;
        }

        /* HERO */
        /* CONTENT */
        .accessibility-content-section {
          padding: 80px 0 100px;
        }

        .accessibility-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 45px;
          align-items: start;
        }

        .accessibility-content {
          min-width: 0;
        }

        .legal-intro {
          background: #ffffff;
          border: 1px solid #e7edf3;
          border-radius: 14px;
          padding: 25px 30px;
          margin-bottom: 25px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.035);
        }

        .legal-intro p {
          margin: 0;
          color: #4a5568;
          font-size: 15px;
          line-height: 1.7;
        }

        .legal-section {
          background: #ffffff;
          border: 1px solid #e7edf3;
          border-radius: 14px;
          padding: 35px;
          margin-bottom: 25px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.035);
        }

        .legal-section h2 {
          position: relative;
          margin: 0 0 25px;
          padding-left: 18px;
          color: #121e32;
          font-family: "Poppins", sans-serif;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.25;
        }

        .legal-section h2::before {
          content: "";
          position: absolute;
          left: 0;
          top: 3px;
          width: 4px;
          height: calc(100% - 6px);
          border-radius: 10px;
          background: #00b1e2;
        }

        .legal-section p {
          color: #595959;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          line-height: 1.8;
          margin: 0 0 18px;
        }

        .legal-section p:last-child {
          margin-bottom: 0;
        }

        .legal-section a,
        .legal-intro a {
          color: #009689;
          text-decoration: none;
          word-break: break-word;
        }

        .legal-section a:hover,
        .legal-intro a:hover {
          text-decoration: underline;
        }

        .legal-section ul {
          margin: 10px 0 0;
          padding-left: 22px;
        }

        .legal-section li {
          color: #595959;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 10px;
          padding-left: 5px;
        }

        .legal-section li::marker {
          color: #00b1e2;
        }

        /* STATUS */
        .status-box {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #f4fbfd;
          border: 1px solid #cceef7;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }

        .status-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #009689;
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
        }

        .status-box strong {
          color: #121e32;
          font-size: 15px;
        }

        .status-box p {
          margin-top: 4px !important;
        }

        /* CONTACT */
        .contact-card {
          margin: 25px 0;
          background: #f7f9fc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 22px;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .contact-label {
          color: #121e32;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .contact-item a {
          font-size: 16px;
          font-weight: 600;
        }

        .contact-item small {
          color: #718096;
          font-size: 13px;
        }

        .response-text {
          margin-bottom: 25px !important;
        }

        address {
          color: #595959;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
          font-style: normal;
          line-height: 1.8;
        }

        /* AUTHORITIES */
        .authority-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 25px 0;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .authority-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 15px 18px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .authority-item:last-child {
          border-bottom: 0;
        }

        .authority-item span {
          color: #4a5568;
          font-family: "Poppins", sans-serif;
          font-size: 15px;
        }

        .authority-item a {
          font-weight: 600;
          text-align: right;
        }

        /* CLOSING */
        .accessibility-closing {
          padding: 15px 10px;
        }

        .accessibility-closing p {
          color: #718096;
          font-family: "Poppins", sans-serif;
          font-size: 14px;
          line-height: 1.7;
        }

        /* SIDEBAR */
        .accessibility-sidebar {
          position: sticky;
          top: 110px;
        }

        .sidebar-card {
          background: #121e32;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 22px;
          box-shadow: 0 10px 35px rgba(18, 30, 50, 0.12);
        }

        .sidebar-card-light {
          background: #ffffff;
          border: 1px solid #e7edf3;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.035);
        }

        .sidebar-label {
          display: block;
          margin-bottom: 15px;
          color: #00b1e2;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.7px;
        }

        .sidebar-card h3 {
          margin: 0 0 15px;
          color: #ffffff;
          font-family: "Poppins", sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
        }

        .sidebar-card p {
          margin: 0 0 25px;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.7;
        }

        .sidebar-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 46px;
          padding: 10px 18px;
          border-radius: 7px;
          background: #009689;
          color: #ffffff !important;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .sidebar-button:hover {
          background: #00796f;
          transform: translateY(-2px);
        }

        .sidebar-card-light .sidebar-label {
          color: #637280;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
        }

        .sidebar-links a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 0;
          border-bottom: 1px solid #e9eef3;
          color: #009689;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .sidebar-links a:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .sidebar-links a:hover {
          color: #00796f;
        }

        .sidebar-links span {
          color: #009689;
          font-size: 18px;
        }

        /* RESPONSIVE */
        @media (max-width: 991px) {
          .accessibility-layout {
            grid-template-columns: 1fr;
          }

          .accessibility-sidebar {
            position: static;
          }

          .sidebar-card {
            margin-bottom: 20px;
          }
        }

        @media (max-width: 767px) {
          .accessibility-page .container {
            width: min(100% - 32px, 1280px);
          }

          .accessibility-content-section {
            padding: 50px 0 70px;
          }

          .legal-section {
            padding: 25px 20px;
            border-radius: 10px;
          }

          .legal-section h2 {
            font-size: 22px;
          }

          .legal-intro {
            padding: 20px;
          }

          .authority-item {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }

          .authority-item a {
            text-align: left;
          }

          .status-box {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .legal-section {
            padding: 22px 17px;
          }

          .legal-section h2 {
            font-size: 20px;
          }

          .legal-section p,
          .legal-section li {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default Accessibility;