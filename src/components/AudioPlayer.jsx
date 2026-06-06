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
    <div className={`audio-player ${isActive ? 'audio-player--active' : ''}`}>
      <audio ref={audioRef} preload="none" src={demo.src} />
      <div className="audio-player__controls">
        <button
          type="button"
          className="audio-player__play"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${demo.title}` : `Play ${demo.title}`}
        >
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} aria-hidden="true" />
        </button>

        <div className="audio-player__track">
          <span className="audio-player__title">{demo.title}</span>
          <button
            type="button"
            className="audio-player__progress"
            onClick={handleSeek}
            aria-label={`Seek ${demo.title}`}
          >
            <span className="audio-player__progress-rail" />
            <span
              className="audio-player__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </button>
          <span className="audio-player__time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <a
          className="audio-player__download"
          href={demo.src}
          download
          aria-label={`Download ${demo.title}`}
        >
          <i className="fa-solid fa-cloud-arrow-down" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
