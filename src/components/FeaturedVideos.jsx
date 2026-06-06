import { featuredVideos } from '../data/siteData';

export default function FeaturedVideos() {
  return (
    <section id="videos" className="featured-videos">
      <div className="container">
        <h2 className="section-heading">Featured Videos</h2>
        <div className="featured-videos__grid">
          {featuredVideos.map((video) => (
            <div key={video.id} className="featured-videos__item">
              <div className="featured-videos__frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
