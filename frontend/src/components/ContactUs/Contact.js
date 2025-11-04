import React from "react";
import "./Contact.css";

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-title">
          <h3>
            Need to <span>Talk?</span>
          </h3>
          <h5>Reach out to CalmSpace for support or session bookings.</h5>
        </div>

        <div className="contact-row">
          <div className="contact-info">
  <div className="info-item">
    <i className="bi bi-geo-alt"></i>
    <h4>Our Space:</h4>
    <p>No.12, Peace Avenue, Galle, Sri Lanka.</p>
  </div>

  <div className="info-item">
    <i className="bi bi-envelope"></i>
    <h4>Email Us:</h4>
    <p>hello@calmspace.lk</p>
  </div>

  <div className="info-item">
    <i className="bi bi-phone"></i>
    <h4>Call / WhatsApp:</h4>
    <p>+94 77 654 3210</p>
  </div>

  <div className="info-item">
    <i className="bi bi-clock"></i>
    <h4>Working Hours:</h4>
    <p>Mon - Fri: 9:00 AM – 6:00 PM<br />Sat: 9:00 AM – 1:00 PM</p>
  </div>

  <div className="info-item">
    <i className="bi bi-exclamation-triangle"></i>
    <h4>Emergency Support:</h4>
    <p>In urgent cases, please call <strong>1333</strong> (Sri Lanka Mental Health Helpline).</p>
  </div>
</div>


          <div className="contact-form">
            <form className="form">
              <div className="form-row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea
                rows="5"
                placeholder="How can we support you?"
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63480.8374898179!2d80.17697731341235!3d6.055975780910134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1669952452895!5m2!1sen!2slk"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
