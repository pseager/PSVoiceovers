import { useState } from 'react';
import { navLinks, siteConfig } from '../data/siteData';
import { openEmailClient } from '../utils/openEmail';
import SocialLinks from './SocialLinks';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a href="#home" className="site-header__brand">
          <span className="site-header__name">{siteConfig.name}</span>
        </a>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-header__toggle-icon" aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>

        <div className={`site-header__panel ${menuOpen ? 'site-header__panel--open' : ''}`}>
          <nav id="site-navigation" className="site-header__nav" aria-label="Main navigation">
            <ul className="site-header__nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} onClick={handleNavClick}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__meta">
            <a href={siteConfig.phoneHref} target="_blank" rel="noopener noreferrer">
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => openEmailClient(event, siteConfig.emailHref)}
            >
              {siteConfig.email}
            </a>
            <SocialLinks variant="gold" />
          </div>
        </div>
      </div>
    </header>
  );
}
