"use client";

export default function ApproachSection() {
  const steps = [
    {
      num: "01",
      title: "Audit & Map",
      desc: "We dive deep into your organization's current operations. We identify every SaaS silo, duplicate manual task, and information bottleneck where context gets lost.",
    },
    {
      num: "02",
      title: "Abstract Flows",
      desc: "Instead of building around a specific tool (like a Jira board or Salesforce fields), we map out the core cognitive flow—how your people actually make decisions.",
    },
    {
      num: "03",
      title: "AI-Native Integration",
      desc: "We construct custom AI agents and integrations that run in the background. Your team interacts with simple, natural layouts while the AI orchestrates systems.",
    },
    {
      num: "04",
      title: "Continuous Refinement",
      desc: "Operations aren't static. We monitor execution paths and dynamically adjust templates, instructions, and logic so your systems get smarter every week.",
    },
  ];

  return (
    <section id="approach" className="theme-dark approach-section">
      <div className="section-grid-lines" />
      <div className="ambient-glow glow-1" />

      <div className="container approach-container">
        <div className="approach-header">
          <span className="section-tag">02 / Our Approach</span>
          <h2 className="section-title">Rebuilding operations from the ground up.</h2>
          <p className="approach-lead">
            We don't sell another platform. We work with you to redesign your operational systems around AI, removing SaaS debt and restoring speed.
          </p>
        </div>

        <div className="approach-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="premium-card approach-card">
              <div className="card-top">
                <span className="card-number">{step.num}</span>
                <div className="card-glow-dot"></div>
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
