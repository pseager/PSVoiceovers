import { aboutContent } from '../data/siteData';

function AboutCard({ title, items, paragraphs }) {
  return (
    <article className="about-card">
      <h3 className="about-card__title">{title}</h3>
      {items && (
        <ul className="about-card__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="about-card__text">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-header__eyebrow">About</span>
          <h2 className="section-header__title">The Voice &amp; The Studio</h2>
        </div>
        <div className="about__grid">
          <AboutCard title="About Me" items={aboutContent.aboutMe} />
          <AboutCard title="The Studio" items={aboutContent.studio} />
          <AboutCard title="Directed Sessions" items={aboutContent.directedSessions} />
          <AboutCard title="Why Me?" paragraphs={aboutContent.whyMe} />
        </div>
      </div>
    </section>
  );
}
