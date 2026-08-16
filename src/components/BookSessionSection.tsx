"use client";

import React, { useState } from "react";

export default function BookSessionSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    bottleneck: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking session submit
    setSubmitted(true);
  };

  return (
    <section id="book-session" className="theme-dark book-session-section">
      <div className="section-grid-lines" />
      <div className="ambient-glow glow-1" />

      <div className="container book-container">
        <div className="book-card-wrap">
          {submitted ? (
            <div className="book-success-message">
              <span className="success-icon">✦</span>
              <h2>Session Request Received</h2>
              <p>
                Thanks for reaching out, {formState.name.split(" ")[0]}. We will review your company's operational profile and email you at <strong>{formState.email}</strong> within 24 hours to schedule your audit session.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Back to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="book-form-card">
              <div className="form-header">
                <span className="section-tag">06 / Book a Session</span>
                <h2>Schedule an Operational Audit</h2>
                <p>
                  Work with our studio leads to map your tool-debt bottlenecks and design an AI-native operational blueprint. No sales pitch, just pure architecture.
                </p>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="input-group full-width">
                  <label htmlFor="company">Company Name & URL</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="Acme Corp (acme.com)"
                  />
                </div>

                <div className="input-group full-width">
                  <label htmlFor="bottleneck">What is your single biggest operational bottleneck?</label>
                  <textarea
                    id="bottleneck"
                    rows={4}
                    required
                    value={formState.bottleneck}
                    onChange={(e) => setFormState({ ...formState, bottleneck: e.target.value })}
                    placeholder="Describe manual tasks, fragmented data silos, or where your team loses velocity..."
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Request Audit Session ✦
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
