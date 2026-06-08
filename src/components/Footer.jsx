import { siteConfig } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
