import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    message: ''
  });

  const services = [
    'production',
    'marketing + communications',
    'web development',
    'design identity',
    'brand identity',
    'strategy + positioning',
    'social media'
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, []);

  const handleEmailClick = () => {
    window.location.href = 'mailto:andrew@zezwe-it.co.za';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/27671571147', '_blank');
  };

  const handleBookCallClick = () => {
    const formSection = document.querySelector('.contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, services: selectedServices });
  };

  return (
    <div className="contact-section" ref={sectionRef} id="contact">
      <h3 className="contact-subtitle">CONTACT US</h3>
      
      <div className="contact-divider"></div>

      <div className="contact-container">
        <div className="contact-left">
          <p className="contact-message">
            Collaboration is everything. We don't work for you and you certainly don't work for us.<br/>
            We work together — with the shared vision of transforming your brand
          </p>
        </div>

        <div className="contact-right">
          <div className="contact-accordion-item">
            <button className="contact-accordion-btn" onClick={handleBookCallClick}>
              <span className="contact-accordion-text">BOOK CALL</span>
              <span className="contact-accordion-icon">+</span>
            </button>
          </div>
          <div className="contact-accordion-item">
            <button className="contact-accordion-btn" onClick={handleEmailClick}>
              <span className="contact-accordion-text">EMAIL US</span>
              <span className="contact-accordion-icon">+</span>
            </button>
          </div>
          <div className="contact-accordion-item">
            <button className="contact-accordion-btn" onClick={handleWhatsAppClick}>
              <span className="contact-accordion-text">MESSAGE US</span>
              <span className="contact-accordion-icon">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="contact-form-section">
        <div className="contact-form-container">
          <h2 className="contact-form-title">LET'S WORK TOGETHER</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label>Services</label>
              <div className="services-dropdown">
                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <span>
                    {selectedServices.length > 0
                      ? `${selectedServices.length} service(s) selected`
                      : ''}
                  </span>
                  <span className={`dropdown-arrow ${servicesOpen ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {servicesOpen && (
                  <>
                    <div className="dropdown-overlay" onClick={() => setServicesOpen(false)}></div>
                    <div className="dropdown-modal">
                      <div className="dropdown-modal-content">
                        {services.map((service) => (
                          <label key={service} className="dropdown-item">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                              className="modern-checkbox"
                            />
                            <span className="checkbox-custom"></span>
                            <span className="service-label">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Company Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="form-textarea"
                placeholder="Message"
              />
            </div>

            <div className="form-privacy">
              <p>By leaving data in the form you agree to the Privacy Policy.</p>
            </div>

            <button type="submit" className="form-submit-btn">
              SEND REQUEST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
