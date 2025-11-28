import React, { useState } from "react";
import PortalFooter from "../portalComponent/PortalFooter";
import PortalNavbar from "../portalComponent/PortalNavbar";

const faqData = [
  {
    question: "How do I apply for a job?",
    answer: "You can apply for a job by clicking the 'Apply Job' button on the job listing or job details page and following the instructions to submit your resume and application.",
  },
  {
    question: "How do I reset my password?",
    answer: "Go to the 'Change Password' section under your account settings, enter your current password and new password, then save the changes.",
  },
  {
    question: "Can I update my resume after submission?",
    answer: "Yes, you can update your resume from the 'My Resume' section. Make sure to resubmit the updated version for any jobs you are actively applying to.",
  },
  {
    question: "How do I get job notifications?",
    answer: "Enable notifications in the 'Job Alerts' section. You will receive email notifications for jobs matching your preferences.",
  },
  {
    question: "How do I bookmark jobs?",
    answer: "Click the bookmark icon on the job listing or job details page. You can view all bookmarked jobs in the 'Bookmarked Jobs' section.",
  },
];

const Faq= () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <PortalNavbar/>
    <div className="faq-page container">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h4
              className="faq-question"
              onClick={() => toggleAnswer(index)}
              style={{ cursor: "pointer" }}
            >
              {item.question}
            </h4>
            {activeIndex === index && (
              <p className="faq-answer">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    <PortalFooter/>
    </>
  );
};

export default Faq;
