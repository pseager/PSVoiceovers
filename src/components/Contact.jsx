import { siteConfig } from '../data/siteData';
import SocialLinks from './SocialLinks';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <div className="contact__details">
          <h2 className="contact__heading">Contact Paul</h2>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          <SocialLinks variant="white" />
        </div>
      </div>
    </section>
  );
}
