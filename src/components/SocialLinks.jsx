import { socialLinks } from '../data/siteData';
import { externalLinkProps } from '../utils/externalLink';
import SourceConnectIcon from './SourceConnectIcon';

export default function SocialLinks({ variant = 'gold' }) {
  return (
    <div className={`social-links social-links--${variant}`}>
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="social-links__item"
          {...externalLinkProps(link.href)}
          aria-label={link.label}
          title={link.label}
        >
          {link.type === 'source-connect' ? (
            <SourceConnectIcon />
          ) : (
            <i className={link.icon} aria-hidden="true" />
          )}
        </a>
      ))}
    </div>
  );
}
