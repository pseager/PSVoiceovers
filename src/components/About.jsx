import { aboutContent } from '../data/siteData';

function AboutBlock({ title, items, paragraphs }) {
  return (
    <div className="about__block">
      <h3>{title}</h3>
      {items && (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-heading">About</h2>
        <div className="about__content">
          <AboutBlock title="About Me" items={aboutContent.aboutMe} />
          <AboutBlock title="The Studio" items={aboutContent.studio} />
          <AboutBlock title="Directed Sessions" items={aboutContent.directedSessions} />
          <AboutBlock title="Why Me?" paragraphs={aboutContent.whyMe} />
        </div>
      </div>
    </section>
  );
}
