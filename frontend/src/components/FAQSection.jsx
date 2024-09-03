import React, { useState } from "react";
import "../styles/FAQSection.scss";

const FAQSection = ({ question, answer }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Sign up for a free account and start organizing your notes right away",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan anytime from your account settings.",
    },
  ];

  return (
    <section className="faq">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span className={`arrow ${openIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export default FAQSection;
