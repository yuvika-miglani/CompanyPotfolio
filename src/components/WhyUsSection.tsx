"use client";

export default function WhyUsSection() {
  const benefits = [
    {
      title: "Bespoke AI Architecture",
      subtitle: "Custom agents, not API templates.",
      desc: "We don't sell generic Chatbot wrappers. We engineer custom models, prompt templates, and local execution agents configured precisely for your company's proprietary data and workflows.",
    },
    {
      title: "Operations-First Mindset",
      subtitle: "Solving workflow loops, not tasks.",
      desc: "Software development studios focus on shipping features. We focus on shipping efficiency. We map human cognitive habits to design systems that reduce cognitive friction and admin overhead.",
    },
    {
      title: "Studio-Grade Design",
      subtitle: "Aesthetics meet operations.",
      desc: "Our interfaces are designed to wow. We build sleek, minimalist, responsive applications with micro-animations and zero clutter, making work feel like a premium creative experience.",
    },
    {
      title: "Compounding Velocity",
      subtitle: "Faster loops, lower overhead.",
      desc: "By replacing SaaS databases with a clean AI-native operational core, your team moves 10x faster. We measure success in hours reclaimed, tool bills halved, and decisions accelerated.",
    },
  ];

  return (
    <section id="why-us" className="theme-light why-us-section">
      <div className="section-grid-lines" />

      <div className="container why-us-container">
        <div className="why-us-header">
          <span className="section-tag">03 / Why Us</span>
          <h2 className="section-title">Built for builders who care about details.</h2>
          <p className="why-us-lead">
            Operations shouldn't be boring, and they shouldn't be slow. We build custom systems that make companies run with modern fluidity.
          </p>
        </div>

        <div className="why-us-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="premium-card why-us-card">
              <div className="why-us-card-header">
                <h3 className="why-us-card-title">{benefit.title}</h3>
                <span className="why-us-card-subtitle">{benefit.subtitle}</span>
              </div>
              <p className="why-us-card-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
