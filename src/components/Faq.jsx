import { faqs } from '../data/siteData';

export default function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-header__eyebrow">FAQ</span>
          <h2 className="section-header__title">Working With Paul</h2>
        </div>
        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.id} className="faq__item">
              <summary className="faq__question">{faq.question}</summary>
              <p className="faq__answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
