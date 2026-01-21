import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/FAQs.css';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqsData: FAQItem[] = [
  {
    id: '01',
    question: 'How involved will I be in the creative process?',
    answer: "You'll be actively involved throughout the entire project to ensure you're comfortable and fully informed. Once we've signed the contract, we begin with a comprehensive brainstorming session where we dive deep into your needs, preferences, and vision. From there, we maintain regular communication during the execution phase, keeping you updated through email and dedicated WhatsApp or Telegram groups. This way, you're always in the loop, providing feedback and making decisions in real time to ensure the project aligns perfectly with your expectations."
  },
  {
    id: '02',
    question: 'What are your pricing and payment terms?',
    answer: "Our pricing is customised based on the complexity and needs of each project. After our introductory call and reviewing your deliverables, we'll provide a final quote that aligns with your vision. To start, we require a 50% upfront payment to secure your spot and begin work. The remaining 50% is due upon project completion. Access to final deliverables is granted only after the final payment is received and cleared."
  },
  {
    id: '03',
    question: 'What sets your agency apart from others?',
    answer: "First, we focus on business growth, not just aesthetics. Our strategies, bold concepts, and effective designs are geared towards building money-making brands that drive real results. Second, our diverse team is our strength. With global talent, we offer varied perspectives and expertise, tackling challenges creatively from multiple angles. Lastly, our extensive international experience across CIS countries, Europe, Turkey, and the Middle East allows us to craft culturally relevant and impactful solutions for diverse audiences."
  },
  {
    id: '04',
    question: 'How long does the project take?',
    answer: "Project timelines vary based on the services and your specific needs. Strategic work like research and brand identity typically takes up to 2 weeks each. Design identity can range from 1 to 4 weeks, depending on scope and materials. Web design varies as well: a landing page takes about 2 weeks, while a multi-page site may take 3-4 weeks. Marketing research and planning usually take 2-3 weeks, and production/editing ranges from 1 to 3 weeks, depending on complexity. We collaborate closely with you to ensure everything fits seamlessly."
  },
  {
    id: '05',
    question: 'What industries do we specialize in?',
    answer: "Our primary focus is on the hospitality, food and beverage (f&b), and fashion industries, where we've developed deep expertise in creating standout brands. Recently, we've been taking on more creative tech projects, driven by our passion for innovation and cutting-edge design."
  },
  {
    id: '06',
    question: 'How does creative process work?',
    answer: "Our creative process is collaborative, transparent, and efficient. It starts with an introductory call where you share your vision, and we introduce our team, explain how we work, and discuss how we can help. Within two days, we send a proposal outlining goals, scope, timeline, deliverables, and pricing. After your approval and a 50% upfront payment, we dive into the creative work, keeping you involved throughout to ensure everything meets your expectations."
  }
];

const FAQs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-section" ref={sectionRef} id="faqs">
      <div className="faqs-container">
        <div className="faqs-left">
          <h2 className="faqs-heading">FAQS({faqsData.length})</h2>
        </div>

        <div className="faqs-right">
          {faqsData.map((faq, index) => (
            <div key={faq.id} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleAccordion(index)}>
                <span className="faq-number">({faq.id})</span>
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
