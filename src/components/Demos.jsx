import { useState } from 'react';
import { audioDemos } from '../data/siteData';
import AudioPlayer from './AudioPlayer';

export default function Demos() {
  const [activeDemoId, setActiveDemoId] = useState(null);

  return (
    <section id="demos" className="demos">
      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">Voice Samples</span>
          <h2 className="section-header__title">Listen &amp; Download</h2>
          <p className="section-header__lead">
            Press play on any demo below. Files are available for download.
          </p>
        </div>
        <div className="demos__grid">
          {audioDemos.map((demo) => (
            <AudioPlayer
              key={demo.id}
              demo={demo}
              isActive={activeDemoId === demo.id}
              onPlay={setActiveDemoId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
