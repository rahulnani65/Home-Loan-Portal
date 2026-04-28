import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./Loans.css";
import { LOANS } from "../../utils/loans";

export default function Loans() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="loans-page">

        {/* Hero */}
        <div className="loans-hero">
          <div className="loans-hero-badge">4 loan products available</div>
          <h1>Find the right loan for you</h1>
          <p>
            Compare our home loan products from purchase to renovation
            <br className="d-none d-md-block" /> and apply in minutes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="loans-grid">
          {LOANS.map((loan) => (
            <div className="loan-card" key={loan.title}>

              {/* Card Header */}
              <div className="loan-card-header">
                <div className="loan-card-icon" style={{ background: loan.iconBg }}>
                  {loan.icon}
                </div>
                <span className="loan-card-rate" style={{ color: loan.rateColor }}>
                  From {loan.rate}
                </span>
              </div>

              <h3 className="loan-card-title">{loan.title}</h3>
              <p className="loan-card-desc">{loan.desc}</p>

              {/* Stats */}
              <div className="loan-card-stats">
                <div className="loan-stat">
                  <span className="loan-stat-value">{loan.maxAmount}</span>
                  <span className="loan-stat-label">Max amount</span>
                </div>
                <div className="loan-stat-divider" />
                <div className="loan-stat">
                  <span className="loan-stat-value">{loan.tenure}</span>
                  <span className="loan-stat-label">Max tenure</span>
                </div>
              </div>

              <div className="loan-card-approval">
                <span className="loan-approval-value">{loan.approval}</span>
                <span className="loan-approval-label">Approval</span>
              </div>

              {/* Features */}
              <ul className="loan-features">
                {loan.features.map((f) => (
                  <li key={f}>
                    <span className="loan-feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="loan-apply-btn"
                onClick={() => navigate(`/apply?type=${loan.loanKey}`)}
              >
                {loan.applyLabel} →
              </button>

            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
}
