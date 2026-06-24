import { useEffect, useRef, useState } from 'react';

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ demo, isActive, onPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    onPlay(demo.id);
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const nextTime = (clickX / rect.width) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <article className={`demo-card ${isActive ? 'demo-card--active' : ''}`}>
      <audio ref={audioRef} preload="none" src={demo.src} />
      <div className="demo-card__top">
        <button
          type="button"
          className="demo-card__play"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${demo.title}` : `Play ${demo.title}`}
        >
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} aria-hidden="true" />
        </button>
        <h3 className="demo-card__title">{demo.title}</h3>
        <a
          className="demo-card__download"
          href={demo.src}
          download
          aria-label={`Download ${demo.title}`}
        >
          <i className="fa-solid fa-cloud-arrow-down" aria-hidden="true" />
        </a>
      </div>
      <button
        type="button"
        className="demo-card__progress"
        onClick={handleSeek}
        aria-label={`Seek ${demo.title}`}
      >
        <span className="demo-card__progress-rail" />
        <span className="demo-card__progress-fill" style={{ width: `${progress}%` }} />
      </button>
      <span className="demo-card__time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </article>
  );
}
