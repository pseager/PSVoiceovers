import { featuredVideos } from '../data/siteData';

export default function FeaturedVideos() {
  return (
    <section id="videos" className="videos">
      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">Showreel</span>
          <h2 className="section-header__title">Featured Videos</h2>
        </div>
        <div className="videos__grid">
          {featuredVideos.map((video) => (
            <article key={video.id} className="videos__item">
              <div className="videos__frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
