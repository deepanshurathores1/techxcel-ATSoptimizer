"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

// Define FAQ item props
interface FAQItemProps {
  question: string;
  answer: string;
  theme?: string;
}

export default function MinimalistFAQPage() {
  const { theme } = useTheme();

  const faqs: FAQItemProps[] = [
    {
      question: "What is ATSOptimizer?",
      answer:
        "ATSOptimizer is a powerful resume builder and analysis tool designed to help job seekers create ATS-friendly resumes and improve their chances of getting past Applicant Tracking Systems.",
    },
    {
      question: "How does ATSOptimizer work?",
      answer:
        "ATSOptimizer uses advanced algorithms to analyze your resume, suggest improvements, and help you tailor your content to match job descriptions. It also provides a user-friendly interface for building professional resumes.",
    },
    {
      question: "Is ATSOptimizer free to use?",
      answer:
        "We offer both free and premium plans. The free plan includes basic resume building and analysis features, while our premium plans offer advanced optimization tools and unlimited resume creations.",
    },
    {
      question: "Can ATSOptimizer guarantee that my resume will pass ATS scans?",
      answer:
        "While we can't guarantee 100% success, ATSOptimizer significantly improves your resume's chances of passing ATS scans by following best practices and industry standards for resume formatting and content.",
    },
    {
      question: "How often should I update my resume using ATSOptimizer?",
      answer:
        "We recommend updating your resume for each job application to tailor it to the specific job requirements. However, you should also review and update your base resume every 3-6 months or whenever you have new skills or experiences to add.",
    },
    {
      question: "Can I import my existing resume into ATSOptimizer?",
      answer:
        "Yes, you can import your existing resume in various formats (PDF, DOCX, etc.) into ATSOptimizer. Our system will analyze it and provide suggestions for improvement.",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-16 text-center">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Fixed FAQItem component with explicit types
const FAQItem: React.FC<FAQItemProps> = ({ question, answer, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      <button className="w-full text-left focus:outline-none group" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium group-hover:text-gray-600 transition-colors duration-200">
            {question}
          </h2>
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

