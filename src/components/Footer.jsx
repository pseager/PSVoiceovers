import { siteConfig } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          {siteConfig.copyright} -{' '}
          <span className="footer__powered">
            Powered by{' '}
            <a
              href="https://voiceactor.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              VoiceActor.com
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
