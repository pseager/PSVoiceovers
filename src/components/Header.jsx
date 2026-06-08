import { useState } from 'react';
import { navLinks, siteConfig } from '../data/siteData';
import SocialLinks from './SocialLinks';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__brand">
          <SocialLinks variant="gold" />
          <div className="header__title-group">
            <p className="header__title">
              <a href="#home">{siteConfig.name}</a>
            </p>
            <p className="header__tagline">{siteConfig.tagline}</p>
          </div>
        </div>

        <button
          type="button"
          className="header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          id="site-navigation"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} onClick={handleNavClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__contact">
          <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
    </header>
  );
}
