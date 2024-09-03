import React from "react";
import { Link } from "react-router-dom";
import "../styles/Pricing.scss";

const Pricing = () => {
  const plans = [
    {
      title: "Free Plan",
      price: "$0/month",
      features: [
        "Basic note-taking features",
        "Limited storage (1GB)",
        "Markdown support",
      ],
    },
    {
      title: "Pro Plan",
      price: "$9.99/month",
      features: [
        "Advanced note-taking features",
        "Unlimited storage",
        "Real-time sync across devices",
        "Priority support",
      ],
    },
    {
      title: "Enterprise Plan",
      price: "Contact us",
      features: [
        "Custom solutions for businesses",
        "Dedicated account manager",
        "Advanced security features",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <section className="pricing">
      <div className="container">
        <h2>Pricing</h2>
        <div className="pricing-options">
          {plans.map((plan, index) => (
            <div key={index} className="pricing-option">
              <h3>{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Link to="/register" className="cta-button">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
