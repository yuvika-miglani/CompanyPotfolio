"use client";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="site-footer">
      {/* 1. Left Column: Logo & Socials */}
      <div className="footer-col logo-col">
        <div className="footer-logo-inner" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <span className="logo-dot">•</span>
          <span className="logo-text">1126LABS<sup>®</sup></span>
        </div>
        <p className="footer-tagline">
          The operations studio for businesses ready to rebuild around AI.
        </p>
        <div className="footer-socials" style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-link-btn" aria-label="X (Twitter)">
            X.com
          </a>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link-btn" aria-label="LinkedIn">
            LinkedIn
          </a>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <a href="mailto:hello@1126labs.com" className="footer-link-btn" aria-label="Email">
            hello@1126labs.com
          </a>
        </div>
      </div>

      {/* 2. Middle Column: Links Grid */}
      <div className="footer-col links-col">
        <div className="footer-links-grid">
          <div className="footer-sub-col">
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => handleScrollTo("dilemma")} className="footer-link-btn">Blueprint</button></li>
              <li><button onClick={() => handleScrollTo("approach")} className="footer-link-btn">Approach</button></li>
              <li><button onClick={() => handleScrollTo("why-us")} className="footer-link-btn">Why us</button></li>
              <li><button onClick={() => handleScrollTo("fit")} className="footer-link-btn">Fit</button></li>
              <li><button onClick={() => handleScrollTo("faq")} className="footer-link-btn">FAQ</button></li>
            </ul>
          </div>
          <div className="footer-sub-col">
            <h4 className="footer-heading">Studio</h4>
            <ul className="footer-links-list">
              <li><a href="mailto:hello@1126labs.com" className="footer-anchor-link">hello@1126labs.com</a></li>
              <li><button onClick={() => handleScrollTo("book-session")} className="footer-link-btn">Book a session</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Right Column: About 1126 & Copyright */}
      <div className="footer-col cta-col">
        <h4 className="footer-heading">1126</h4>
        <p className="footer-about-text">
          November 26 — the day we decided operations shouldn't be built around tools, but around how people actually think.
        </p>
        <div className="footer-bottom-info">
          <p className="footer-copyright">© 2026 1126 Labs. All rights reserved.</p>
          <p style={{ marginTop: "4px", fontSize: "0.75rem" }}>Set in Libre Caslon & Inter.</p>
        </div>
      </div>
    </footer>
  );
}
