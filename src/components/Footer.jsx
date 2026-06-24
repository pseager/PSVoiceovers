import { siteConfig } from '../data/siteData';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__copy">{siteConfig.copyright}</p>
        <SocialLinks variant="gold" />
      </div>
    </footer>
  );
}
