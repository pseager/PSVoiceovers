import logo from '../assets/images/logo.png';
import headshot from '../assets/images/headshot.jpg';
import commercialDemo from '../assets/audio/commercial-demo.mp3';
import imaginariumDemo from '../assets/audio/imaginarium-360.mp3';
import elearningDemo from '../assets/audio/elearning-demo.mp3';
import imagingDemo from '../assets/audio/imaging-demo.mp3';
import ivrDemo from '../assets/audio/ivr-telephony.mp3';
import oldManDemo from '../assets/audio/old-man.mp3';
import charactersDemo from '../assets/audio/characters.mp3';

export const siteConfig = {
  name: 'Paul Seager',
  tagline: 'Voice Talent',
  phone: '801-683-7175',
  phoneHref: 'tel:+18016837175',
  email: 'paul@psvoiceovers.com',
  copyright: '©2026 psvoiceovers.com',
  logo,
  headshot,
};

export const socialLinks = [
  {
    id: 'facebook',
    href: 'https://www.facebook.com/paulseager1/',
    label: 'Facebook',
    icon: 'fa-brands fa-facebook-f',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/paul-seager-08002814/',
    label: 'LinkedIn',
    icon: 'fa-brands fa-linkedin-in',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@paul-seager',
    label: 'YouTube',
    icon: 'fa-brands fa-youtube',
  },
  {
    id: 'source-connect',
    href: 'https://source-elements.com/find/pseager',
    label: 'Source Connect',
    type: 'source-connect',
  },
];

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'demos', label: 'Demos', href: '#demos' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const audioDemos = [
  {
    id: 'commercial',
    title: 'Commercial Demo',
    src: commercialDemo,
  },
  {
    id: 'imaginarium',
    title: 'Imaginarium 360',
    src: imaginariumDemo,
  },
  {
    id: 'elearning',
    title: 'E-Learning Demo',
    src: elearningDemo,
  },
  {
    id: 'imaging',
    title: 'Imaging Demo',
    src: imagingDemo,
  },
  {
    id: 'ivr',
    title: 'IVR-(Telephony)',
    src: ivrDemo,
  },
  {
    id: 'old-man',
    title: 'Old Man',
    src: oldManDemo,
  },
  {
    id: 'characters',
    title: 'Characters',
    src: charactersDemo,
  },
];

export const featuredVideos = [
  { id: 'video-1', youtubeId: 'p6KXPH0zQKE', title: 'Featured video 1' },
  { id: 'video-2', youtubeId: 'D3qGx8pPGoE', title: 'Featured video 2' },
  { id: 'video-3', youtubeId: 'kTIEYZC3N_w', title: 'Featured video 3' },
  { id: 'video-4', youtubeId: 'fYKxJuXw_7c', title: 'Featured video 4' },
  { id: 'video-5', youtubeId: '2RRVs3-isa8', title: 'Featured video 5' },
];

export const aboutContent = {
  aboutMe: [
    'Attentive',
    'Reliable',
    'Fun',
    'Fast',
    'Easy to work with',
    'Personable',
    'Professional',
    'Prompt',
  ],
  studio: [
    'Professional Studio',
    'Broadcast Ready Audio',
    'Mic - Sennheiser MKH 416',
    'Focusrite Scarlett 4i4 3rd Gen Audio Interface',
    'RØDECaster Pro Audio Interface and Mixer',
    'Reaper DAW',
    'iZotope RX 11',
  ],
  directedSessions: [
    'Source-Connect',
    'Zoom',
    'Google Meet',
    'Webex',
    'Microsoft Teams',
    'Any Other Video Conferencing',
  ],
  whyMe: [
    'As the voice behind PS Voiceovers LLC, I bring a fresh and enthusiastic approach to voice-over work. With a passion for storytelling and a keen ear for detail, I specialize in delivering clear, engaging audio for commercials, e-learning, imaging, and more. My background in technology, audio, and radio provides me with a unique perspective and a versatile vocal range.',
    "My impeccable work ethic sets me apart—I'm committed, timely, and easy to work with, making the process both fun and professional. Let's collaborate to bring your vision to life. Contact me today and let's create something amazing together!",
  ],
};
