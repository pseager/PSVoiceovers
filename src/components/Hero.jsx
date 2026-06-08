import { useState } from 'react';
import micBackground from '../assets/images/mic-background.jpeg';
import { audioDemos, siteConfig } from '../data/siteData';
import AudioPlayer from './AudioPlayer';

export default function Hero() {
  const [activeDemoId, setActiveDemoId] = useState(null);

  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `url(${micBackground}), linear-gradient(100deg, #164b72 50.3%, #283e53 50.39%, #283e53 50.89%, #164b72 51%)`,
      }}
    >
      <div className="container hero__inner">
        <h1 className="sr-only">
          Paul Seager — Professional Male Voice Over Talent for Commercials,
          E-Learning, Imaging, and IVR
        </h1>
        <div className="hero__content">
          <a href="#home" className="hero__logo-link">
            <img
              src={siteConfig.logo}
              alt="PS Voiceovers — Paul Seager professional voice over talent"
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
            alt="Paul Seager, professional male voice over artist and narrator"
            className="hero__headshot"
          />
        </div>
      </div>
    </section>
  );
}
