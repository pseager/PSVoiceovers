import { useState } from 'react';
import { audioDemos, siteConfig } from '../data/siteData';
import AudioPlayer from './AudioPlayer';

export default function Hero() {
  const [activeDemoId, setActiveDemoId] = useState(null);

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <a href="#home" className="hero__logo-link">
            <img
              src={siteConfig.logo}
              alt="PS Voiceovers logo"
              className="hero__logo"
            />
          </a>

          <div id="demos" className="hero__demos">
            {audioDemos.map((demo) => (
              <AudioPlayer
                key={demo.id}
                demo={demo}
                isActive={activeDemoId === demo.id}
                onPlay={setActiveDemoId}
              />
            ))}
          </div>

          <a href="#contact" className="hero__cta button-bg">
            Let&apos;s Work Together - Contact Me
          </a>
        </div>

        <div className="hero__headshot-wrap">
          <img
            src={siteConfig.headshot}
            alt="Paul Seager headshot"
            className="hero__headshot"
          />
        </div>
      </div>
    </section>
  );
}
