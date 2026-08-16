"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FAQItem[] = [
    {
      question: "How is 1126 Labs different from a traditional dev agency?",
      answer: "Traditional agencies build code to specs without questioning operational design. We audit and map your cognitive processes first, removing SaaS fragmentation. We build bespoke AI integrations that automate the core loops of your business rather than just handing you more features.",
    },
    {
      question: "How long does a typical engagement take?",
      answer: "A standard engagement spans 6 to 10 weeks. This includes the initial operational mapping (Phase 1), abstracting data flows (Phase 2), developing custom AI agents and layouts (Phase 3), and fine-tuning integrations (Phase 4).",
    },
    {
      question: "Do you integrate with our existing codebase and software?",
      answer: "Absolutely. We build integrations directly on top of your current databases and APIs. We can also interface with existing SaaS tools (Notion, Slack, Jira, Salesforce) so your team can transition smoothly without breaking daily workflows.",
    },
    {
      question: "What kind of operational ROI should we expect?",
      answer: "Our partners typically experience a 40% to 60% reduction in manual data entry, ticket filing, and coordination overhead. Success is measured directly in hours reclaimed per employee, shortened decision loops, and reduced subscription overhead.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="theme-light faq-section">
      <div className="section-grid-lines" />

      <div className="container faq-container">
        <div className="faq-sidebar">
          <span className="section-tag">05 / FAQ</span>
          <h2 className="section-title">Common Questions</h2>
          <p className="faq-lead">
            Everything you need to know about working with 1126 Labs to rebuild your operational systems.
          </p>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className={`faq-item-card ${isOpen ? "open" : ""}`}>
                <button className="faq-question-btn" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon-indicator">{isOpen ? "−" : "+"}</span>
                </button>
                <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
