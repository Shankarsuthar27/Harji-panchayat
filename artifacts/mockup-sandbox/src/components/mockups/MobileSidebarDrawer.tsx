import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Phone, Mail, Heart } from 'lucide-react';

const FbIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
  </svg>
);
const TwIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IgIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YtIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const NAV_LINKS = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'About Us', line1: 'About', line2: 'Us', href: '/about', id: 'about' },
  { label: 'Gallery', href: '/gallery', id: 'gallery' },
  { label: 'Events', href: '/event', id: 'events', isRed: true },
  { label: 'Contact Us', line1: 'Contact', line2: 'Us', href: '/contact', id: 'contact' },
  { label: 'Blog', href: '/#blogs', id: 'blogs' },
];

const SOCIALS = [
  { icon: <FbIcon />, href: '#', label: 'Facebook' },
  { icon: <TwIcon />, href: '#', label: 'Twitter' },
  { icon: <IgIcon />, href: '#', label: 'Instagram' },
  { icon: <YtIcon />, href: '#', label: 'YouTube' },
];

const CSS = `
/* Container & Root Reset */
.nb {
  width: 100%;
  z-index: 1000;
  font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.25s ease;
}
.nb:not(.nbf) {
  position: relative;
}
.nb.nbf {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.09);
  animation: nbSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes nbSlideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

/* Top Bar: Forest Green Dark Bar */
.nbt {
  background: #0b231c;
  color: #cbd5e1;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.2s ease, padding 0.25s ease;
}
.nb.nbf .nbt {
  max-height: 0;
  opacity: 0;
  padding: 0;
  border-bottom: none;
}
.nbt-in {
  max-width: 1360px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* Left Contact Items (Offset by Logo Badge Width) */
.nbt-l {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #94a3b8;
  margin-left: clamp(235px, 19vw, 290px);
  white-space: nowrap;
}
.nbt-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.nbt-ico {
  color: #fabc3f;
  flex-shrink: 0;
}
.nbt-lbl {
  color: #e2e8f0;
  font-weight: 600;
}
.nbt-link {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;
}
.nbt-link:hover {
  color: #fabc3f;
}
.nbt-comma {
  color: #94a3b8;
  margin-right: 4px;
}
.nbt-sep {
  color: rgba(255, 255, 255, 0.22);
  user-select: none;
}

/* Right Social Links */
.nbt-r {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #94a3b8;
  margin-left: auto;
  white-space: nowrap;
}
.nbt-follow {
  color: #94a3b8;
  font-size: 12.5px;
  font-weight: 500;
}
.nbsr {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nbsi {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.nbsi:hover {
  background: #fabc3f;
  color: #0b231c;
  transform: translateY(-1px);
}

/* Main Navbar Bar */
.nbb {
  background: #ffffff;
  position: relative;
  border-bottom: 1px solid #f1f5f9;
}
.nbb-in {
  max-width: 1360px;
  margin: 0 auto;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  transition: height 0.25s ease;
}
.nb.nbf .nbb-in {
  height: 68px;
}

/* Golden Saffron Shield Badge (The Iconic Logo Container) */
.nblo {
  position: absolute;
  top: -40px;
  left: 0;
  width: clamp(210px, 18vw, 265px);
  height: calc(40px + 74px);
  background: #fabc3f;
  border-radius: 0 0 38px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  padding-top: 40px;
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(250, 188, 63, 0.38);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}
.nblo:hover {
  box-shadow: 0 10px 30px rgba(250, 188, 63, 0.52);
  background: #ffc44d;
}
.nblo img {
  max-height: 54px;
  max-width: 90%;
  width: auto;
  object-fit: contain;
  display: block;
  transition: transform 0.2s ease;
}
.nblo:hover img {
  transform: scale(1.02);
}

/* Sticky Badge Adjustment */
.nb.nbf .nblo {
  top: 0;
  height: 68px;
  padding-top: 0;
  width: 200px;
  border-radius: 0 0 28px 0;
  box-shadow: 0 4px 16px rgba(250, 188, 63, 0.32);
}
.nb.nbf .nblo img {
  max-height: 42px;
}

/* Desktop Navigation Menu Links */
.nbdn {
  display: none;
  align-items: center;
  gap: clamp(18px, 2.3vw, 36px);
  margin-left: clamp(235px, 19vw, 290px);
}
.nbnl {
  color: #1e293b;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 2px;
  transition: color 0.2s ease;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 1.15;
  text-align: center;
}
.nbnl.is-red {
  color: #e31937;
}
.nbnl-stacked {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.12;
  text-align: center;
}
.nbnl:hover {
  color: #e31937;
}
.nbnl.act {
  color: #e31937;
  font-weight: 700;
}
.nbnl::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2.5px;
  background: #e31937;
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.nbnl:hover::after,
.nbnl.act::after {
  transform: scaleX(1);
}

/* Right Action Buttons (Search & Donate) */
.nbrg {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;
}
.nbsb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.nbsb:hover {
  background: #fff1f2;
  color: #e31937;
  border-color: #fecdd3;
  transform: scale(1.05);
}
.nb-donate-btn {
  background: #e31937;
  color: #ffffff;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(227, 25, 55, 0.35);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.01em;
}
.nb-donate-btn:hover {
  background: #cc142f;
  transform: translateY(-1.5px);
  box-shadow: 0 6px 20px rgba(227, 25, 55, 0.45);
}
.nb-donate-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(227, 25, 55, 0.3);
}
.nb-heart-ico {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nb-donate-btn:hover .nb-heart-ico {
  transform: scale(1.22);
}

/* Mobile Hamburger Toggle Button */
.nbhb {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 9px 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.nbhb:hover {
  background: #fff1f2;
  border-color: #fecdd3;
}
.nbhbar {
  width: 20px;
  height: 2.2px;
  background: #e31937;
  border-radius: 2px;
  display: block;
  transition: all 0.2s ease;
}

/* Zero Layout Shift Spacer */
.nb-spacer {
  display: none;
}
.nb-spacer.active {
  display: block;
  height: 114px;
}

/* Mobile Off-canvas Drawer */
.nbov {
  position: fixed;
  inset: 0;
  background: rgba(11, 35, 28, 0.65);
  backdrop-filter: blur(4px);
  z-index: 99998;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.nbov.open {
  opacity: 1;
  pointer-events: all;
}
.nbsp {
  position: fixed;
  top: 0;
  left: 0;
  width: 86vw;
  max-width: 380px;
  height: 100%;
  background: #ffffff;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 6px 0 35px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}
.nbsp.open {
  transform: translateX(0);
}
.nbsp-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 5;
  flex-shrink: 0;
}
.nbsp-lg {
  background: #fabc3f;
  border-radius: 0 0 16px 0;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(250, 188, 63, 0.35);
}
.nbsp-lg img {
  height: 38px;
  width: auto;
  display: block;
}
.nbsp-cl {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s ease;
}
.nbsp-cl:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fca5a5;
  transform: rotate(90deg);
}
.nbsp-nav {
  flex: 1;
  padding: 12px 0;
}
.nbsl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  font-size: 15.5px;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  border-bottom: 1px solid #f8fafc;
  cursor: pointer;
  background: none;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
}
.nbsl:hover,
.nbsl.act {
  color: #e31937;
  background: #fff1f2;
  border-left-color: #e31937;
  padding-left: 26px;
}
.nbsp-ft {
  padding: 20px;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.nbsp-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nbsp-btn-donate {
  width: 100%;
  background: #e31937;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(227, 25, 55, 0.3);
}
.nbsp-btn-volunteer {
  width: 100%;
  background: #fabc3f;
  color: #1e293b;
  padding: 12px;
  border-radius: 8px;
  font-size: 14.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(250, 188, 63, 0.25);
}
.nbsp-contact {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 6px;
  border-top: 1px dashed #e2e8f0;
  font-size: 13px;
  color: #64748b;
}
.nbsp-contact a {
  color: #334155;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
.nbsp-contact a:hover {
  color: #e31937;
}
.nbsp-sl {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-top: 4px;
}
.nbsp-si {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
}
.nbsp-si:hover {
  background: #e31937;
  border-color: #e31937;
  color: #ffffff;
}

/* Media Queries */
@media (min-width: 1100px) {
  .nbdn {
    display: flex !important;
  }
  .nbhb {
    display: none !important;
  }
}
@media (max-width: 1099px) {
  .nbdn {
    display: none !important;
  }
  .nbhb {
    display: flex !important;
  }
  .nbt-l {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .nbt {
    padding: 0 14px;
  }
  .nblo {
    width: 175px;
    top: -40px;
    height: calc(40px + 62px);
    border-radius: 0 0 28px 0;
    padding-top: 40px;
  }
  .nblo img {
    max-height: 42px;
  }
  .nb.nbf .nblo {
    top: 0;
    height: 60px;
    width: 165px;
    border-radius: 0 0 24px 0;
  }
  .nb.nbf .nblo img {
    max-height: 36px;
  }
  .nbb-in {
    height: 62px;
    padding: 0 14px;
  }
  .nb.nbf .nbb-in {
    height: 60px;
  }
  .nbrg {
    gap: 8px;
  }
  .nb-donate-btn {
    padding: 8px 14px;
    font-size: 13.5px;
  }
  .nb-spacer.active {
    height: 102px;
  }
}
`;

export default function MobileSidebarDrawer({
  onOpenDonate,
  onOpenSearch,
  onOpenVolunteer,
  currentView = 'home',
  onNavigate,
}: {
  onOpenDonate?: () => void;
  onOpenSearch?: () => void;
  onOpenVolunteer?: () => void;
  currentView?: string;
  onNavigate?: (view: string, hash?: string | null) => void;
}) {
  const [isFixed, setIsFixed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(
    currentView === 'about'
      ? 'about'
      : currentView === 'gallery'
      ? 'gallery'
      : currentView === 'events'
      ? 'events'
      : currentView === 'contact'
      ? 'contact'
      : currentView === 'blog-seva' || currentView === 'blog-meditation' || currentView === 'blog-gurukul'
      ? 'blogs'
      : 'home'
  );

  useEffect(() => {
    if (currentView === 'about') {
      setActiveNav('about');
    } else if (currentView === 'gallery') {
      setActiveNav('gallery');
    } else if (currentView === 'events') {
      setActiveNav('events');
    } else if (currentView === 'contact') {
      setActiveNav('contact');
    } else if (currentView === 'blog-seva' || currentView === 'blog-meditation' || currentView === 'blog-gurukul') {
      setActiveNav('blogs');
    }
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 42);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const go = (e: React.MouseEvent, href: string, id: string) => {
    if (e && e.preventDefault) e.preventDefault();
    setActiveNav(id);
    setSidebarOpen(false);

    if (id === 'home') {
      if (onNavigate) {
        onNavigate('home');
      } else {
        window.history.pushState({ view: 'home' }, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (id === 'about') {
      if (onNavigate) {
        onNavigate('about');
      } else {
        window.history.pushState({ view: 'about' }, '', '/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (id === 'gallery') {
      if (onNavigate) {
        onNavigate('gallery');
      } else {
        window.history.pushState({ view: 'gallery' }, '', '/gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (id === 'events') {
      if (onNavigate) {
        onNavigate('events');
      } else {
        window.history.pushState({ view: 'events' }, '', '/event');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (id === 'contact') {
      if (onNavigate) {
        onNavigate('contact');
      } else {
        window.history.pushState({ view: 'contact' }, '', '/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (id === 'blogs') {
      if (onNavigate) {
        onNavigate('home', '#blogs');
      } else {
        window.history.pushState({ view: 'home', hash: '#blogs' }, '', '/#blogs');
        const el = document.querySelector('#blogs');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (currentView !== 'home') {
      const sectionHash = href.startsWith('/#') ? href.replace('/', '') : href.startsWith('#') ? href : null;
      if (onNavigate) {
        onNavigate('home', sectionHash);
      }
      return;
    }

    const anchor = href.replace(/^\//, '');
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const logo = '/home-page-image/sahast-foundation-logo.png';
  const logoFb = 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg';

  return (
    <>
      <style>{CSS}</style>
      <header className={`nb ${isFixed ? 'nbf' : ''}`}>
        {/* Top Notification & Contact Bar */}
        <div className="nbt">
          <div className="nbt-in">
            {/* Contact Items on Left (Clears the yellow badge) */}
            <div className="nbt-l">
              <span className="nbt-item">
                <Phone size={13} className="nbt-ico" />
                <strong className="nbt-lbl">Helpline:</strong>
                <a href="tel:+918696298489" className="nbt-link">+91 8696298489</a>
              </span>
              <span className="nbt-sep">|</span>
              <span className="nbt-item">
                <Mail size={13} className="nbt-ico" />
                <a href="mailto:info@sahastfoundation.in" className="nbt-link">info@sahastfoundation.in</a>
              </span>
            </div>

            {/* Social Icons on Right */}
            <div className="nbt-r">
              <span className="nbt-follow">Follow Us:</span>
              <div className="nbsr">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="nbsi"
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="nbb">
          <div className="nbb-in">
            {/* Golden Logo Shield Badge */}
            <a
              href="/"
              className="nblo"
              onClick={(e) => go(e, '/', 'home')}
              aria-label="Sahast Foundation Home"
            >
              <img
                src={logo}
                alt="सहस्त फाउंडेशन"
                onError={(e) => {
                  e.currentTarget.src = logoFb;
                }}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="nbdn" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`nbnl ${link.isRed ? 'is-red' : ''} ${activeNav === link.id ? 'act' : ''}`}
                  onClick={(e) => go(e, link.href, link.id)}
                >
                  {link.line1 && link.line2 ? (
                    <span className="nbnl-stacked">
                      <span>{link.line1}</span>
                      <span>{link.line2}</span>
                    </span>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </a>
              ))}
            </nav>

            {/* Right Action Section */}
            <div className="nbrg">
              <button
                type="button"
                className="nbsb"
                onClick={onOpenSearch}
                aria-label="Search"
                title="Search"
              >
                <Search size={19} strokeWidth={2.2} />
              </button>

              <button
                type="button"
                className="nb-donate-btn"
                onClick={onOpenDonate}
                aria-label="Donate"
              >
                <Heart size={15} fill="currentColor" className="nb-heart-ico" />
                <span>Donate</span>
              </button>

              <button
                type="button"
                className="nbhb"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle navigation menu"
                aria-expanded={sidebarOpen}
              >
                <span className="nbhbar" />
                <span className="nbhbar" />
                <span className="nbhbar" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent layout shifts on fixed scroll */}
      <div className={`nb-spacer ${isFixed ? 'active' : ''}`} aria-hidden="true" />

      {/* Mobile Backdrop Overlay */}
      <div
        className={`nbov ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`nbsp ${sidebarOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="nbsp-hd">
          <div className="nbsp-lg">
            <img
              src={logo}
              alt="सहस्त फाउंडेशन"
              onError={(e) => {
                e.currentTarget.src = logoFb;
              }}
            />
          </div>
          <button
            type="button"
            className="nbsp-cl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nbsp-nav" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nbsl ${link.isRed ? 'is-red' : ''} ${activeNav === link.id ? 'act' : ''}`}
              style={link.isRed ? { color: '#e31937', fontWeight: 700 } : {}}
              onClick={(e) => go(e, link.href, link.id)}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} style={{ color: link.isRed ? '#e31937' : '#94a3b8', flexShrink: 0 }} />
            </button>
          ))}
        </nav>

        <div className="nbsp-ft">
          <div className="nbsp-actions">
            <button
              type="button"
              className="nbsp-btn-donate"
              onClick={() => {
                setSidebarOpen(false);
                if (onOpenDonate) onOpenDonate();
              }}
            >
              <Heart size={16} fill="currentColor" />
              <span>Donate Now</span>
            </button>
            <button
              type="button"
              className="nbsp-btn-volunteer"
              onClick={() => {
                setSidebarOpen(false);
                if (onOpenVolunteer) onOpenVolunteer();
              }}
            >
              <span>Join as Volunteer</span>
            </button>
          </div>

          <div className="nbsp-contact">
            <a href="tel:+918696298489">
              <Phone size={13} color="#fabc3f" />
              <span>+91 8696298489</span>
            </a>
            <a href="mailto:info@sahastfoundation.in">
              <Mail size={13} color="#fabc3f" />
              <span>info@sahastfoundation.in</span>
            </a>
          </div>

          <div className="nbsp-sl">
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="nbsp-si"
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
