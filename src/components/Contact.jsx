import { siteConfig } from '../data/siteData';
import SocialLinks from './SocialLinks';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__card">
          <div className="section-header section-header--center">
            <span className="section-header__eyebrow">Get in Touch</span>
            <h2 className="section-header__title">Contact Paul</h2>
            <p className="section-header__lead">
              Ready to record? Reach out by email or phone.
            </p>
          </div>
          <div className="contact__actions">
            <a href={`mailto:${siteConfig.email}`} className="contact__action">
              <span className="contact__action-label">Email</span>
              <span className="contact__action-value">{siteConfig.email}</span>
            </a>
            <a href={siteConfig.phoneHref} className="contact__action">
              <span className="contact__action-label">Phone</span>
              <span className="contact__action-value">{siteConfig.phone}</span>
            </a>
          </div>
          <SocialLinks variant="gold" />
        </div>
      </div>
    </section>
  );
}
