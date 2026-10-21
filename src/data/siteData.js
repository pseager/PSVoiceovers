import logo from '../assets/images/logo.png';
import headshot from '../assets/images/headshot.jpg';
import commercialDemo from '../assets/audio/commercial-demo.mp3';
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
  emailHref:
    'mailto:paul@psvoiceovers.com?subject=Voice%20Over%20Inquiry',
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
    id: 'imaging',
    title: 'Imaging Demo',
    src: imagingDemo,
  },
  {
    id: 'elearning',
    title: 'E-Learning Demo',
    src: elearningDemo,
  },
  {
    id: 'ivr',
    title: 'IVR & Telephony',
    src: ivrDemo,
  },
  {
    id: 'characters',
    title: 'Characters',
    src: charactersDemo,
  },
  {
    id: 'old-man',
    title: 'Old Man',
    src: oldManDemo,
  },
];

export const featuredVideos = [
  { id: 'video-1', youtubeId: 'p6KXPH0zQKE', title: 'Commercial Demo Paul Seager' },
  { id: 'video-2', youtubeId: '2RRVs3-isa8', title: 'Narration Demo Paul Seager' },
];

export const faqs = [
  {
    id: 'services',
    question: 'What types of voice over work do you do?',
    answer:
      'Commercials, radio imaging, promo, and corporate narration are my specialties. I also record e-learning, IVR and telephony prompts, and character voices — listen to the demos on this page to hear the range.',
  },
  {
    id: 'turnaround',
    question: 'How quickly will I receive my finished audio?',
    answer:
      'Most projects are delivered within 24 hours. Files come edited and mastered, ready to drop straight into your production.',
  },
  {
    id: 'directed-sessions',
    question: 'Can I direct the session live?',
    answer:
      'Yes. I record in my own broadcast-ready studio and offer directed sessions over Source-Connect, Zoom, Google Meet, Webex, or Microsoft Teams.',
  },
  {
    id: 'location',
    question: 'Where are you located — and do you work with clients outside Utah?',
    answer:
      "I'm based in South Jordan, Utah, and I work with clients everywhere. Sessions and delivery happen online, so location is never a barrier.",
  },
  {
    id: 'getting-started',
    question: 'What do you need from me to get started?',
    answer:
      "Send your script, any direction or reference clips, and where the finished audio will be used. I'll confirm pricing and timing before we record — email paul@psvoiceovers.com.",
  },
];

export const aboutContent = {
  aboutMe: [
    'Based in South Jordan, Utah',
    '3+ decades in technology, audio, and radio',
    'Co-host & producer, How To Love Being Married podcast',
    'Broadcast-ready home studio',
    'Directed sessions via Source-Connect',
    'Most projects delivered within 24 hours',
    'PS Voiceovers LLC',
    'Easy to work with — attentive, reliable, prompt',
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
    'Any other video conferencing platform',
  ],
  whyMe: [
    'As the voice behind PS Voiceovers LLC, I bring more than three decades in technology, audio, and radio to every session. That background means clean, broadcast-ready audio, a versatile range across commercials, imaging, promo, and narration — and a producer\u2019s ear for what a script needs.',
    "I also co-hosted and produced the How To Love Being Married podcast, so I know both sides of the microphone. My impeccable work ethic sets me apart — I'm committed, timely, and easy to work with, making the process both fun and professional. Let's collaborate to bring your vision to life. Contact me today and let's create something amazing together!",
  ],
};
