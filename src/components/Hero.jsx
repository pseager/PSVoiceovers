import micBackground from '../assets/images/mic-background.jpeg';
import { siteConfig } from '../data/siteData';

export default function Hero() {
  return (
    <section
      id="home"
      className="intro"
      style={{
        backgroundImage: `url(${micBackground})`,
      }}
    >
      <div className="intro__scrim" aria-hidden="true" />
      <div className="container intro__grid">
        <div className="intro__copy">
          <img
            src={siteConfig.logo}
            alt=""
            className="intro__logo"
            aria-hidden="true"
          />
          <h1 className="intro__title">{siteConfig.name}</h1>
          <p className="intro__tagline">{siteConfig.tagline}</p>
          <p className="intro__lead">
            Professional voice actor for commercials, e-learning, imaging, IVR,
            and narration. Broadcast-ready studio. Fast turnaround.
          </p>
          <div className="intro__actions">
            <a href="#demos" className="btn btn--primary">
              Hear My Demos
            </a>
            <a href="#contact" className="btn btn--outline">
              Let&apos;s Work Together
            </a>
          </div>
        </div>
        <figure className="intro__portrait">
          <img
            src={siteConfig.headshot}
            alt="Paul Seager, professional male voice over artist and narrator"
          />
        </figure>
      </div>
    </section>
  );
}
