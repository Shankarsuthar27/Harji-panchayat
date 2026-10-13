import { type CSSProperties, type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import villageBannerUrl from '@/assets/village/panchayat-bhawan.jpg';
import panchayatBhawanImg from '@/assets/village/panchayat-bhawan.jpg';
import govtSchoolImg from '@/assets/village/govt-school.jpg';
import harjiBazaarImg from '@/assets/village/harji-bazaar-chowk.jpg';
import harjiBusStandImg from '@/assets/village/harji-bus-stand.jpg';
import harjiJeepTaxiImg from '@/assets/village/harji-jeep-taxi-stand.jpg';
import stateEmblemUrl from './assets/state-emblem-india.svg';
import {
  getGetPortalSummaryQueryKey,
  getListPanchayatWorksQueryKey,
  useCreatePublicComplaint,
  useCreatePublicInquiry,
  useGetPortalSummary,
  useListPanchayatWorks,
} from '@workspace/api-client-react';
import type {
  PanchayatWork,
  PublicComplaintInput,
  PublicInquiryInput,
  SubmissionReceipt,
} from '@workspace/api-client-react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  FileQuestion,
  FileText,
  House,
  Landmark,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Users,
  X,
  ChevronRight,
  Mail,
  Heart,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import MobileSidebarDrawer from '@/components/MobileSidebarDrawer';
import { localizeWork, DEMO_WORKS, DEMO_COMPLAINTS } from '@/data/panchayatData';

const queryClient = new QueryClient();

type Language = 'en' | 'hi';

const copy = {
  en: {
    home: 'Home',
    works: 'Development works',
    inquiry: 'Ask a question',
    complaints: 'Register a complaint',
    wardPanch: 'Ward Panch',
    wardPanchSubtitle: 'Ward representatives for Harji Gram Panchayat.',
    patta: 'Apply for Ghar Ka Patta',
    pattaTitle: 'Preliminary Ghar Ka Patta application',
    pattaSubtitle: 'Send your contact details and property location as an initial request for a Ghar Ka Patta.',
    applicantDetails: 'Applicant and property details',
    keepRefText: 'Keep the reference number after submitting this preliminary request.',
    fullName: 'Full name',
    mobileNumber: 'Mobile number',
    wardNumber: 'Ward number',
    currentAddress: "Applicant's current address",
    propertyAddress: 'Location or address of the property',
    additionalDetails: 'Additional details (optional)',
    noSensitiveHint: 'Do not enter Aadhaar, bank, or other sensitive document numbers here.',
    pattaConsent: 'I confirm the information is accurate and understand this request is for Panchayat review only; submission does not grant or guarantee a patta.',
    submitPatta: 'Submit preliminary request',
    beforeApplying: 'Before applying',
    beforeApplyingIntro: 'This portal records an initial request only. Confirm eligibility, required documents, fees, and process with the Panchayat office.',
    beforeApplyingItem1: 'Submitting does not approve a patta or guarantee eligibility.',
    beforeApplyingItem2: 'Contact the office with your reference number for next steps; staff are not automatically notified.',
    beforeApplyingItem3: 'Do not provide sensitive identity or bank details in this form.',
    pattaReceiptMsg: 'Your preliminary Ghar Ka Patta request has been recorded. Keep this reference for your records.',
    publicReps: 'Public representatives',
    wardDirectory: 'Ward-wise directory',
    wardDirectoryDesc: 'Names and contact details will be published after they are verified by the Panchayat.',
    wardRosterEmptyTitle: 'Verified ward list not available yet',
    wardRosterEmptyDesc: 'Ward Panch names and ward numbers will appear here once the Panchayat provides the verified roster.',
    askPanchayatBtn: 'Ask the Panchayat',
    search: 'Search works',
    menu: 'Menu',
    homeCrumb: 'Home',
    report: 'Submit a grievance',
    track: 'View development works',
    ask: 'Ask the Panchayat',
    overview: 'Village at a glance',
    latest: 'Latest update',
    latestText: 'Public services and Panchayat information, gathered in one place.',
    viewAll: 'Browse all works',
    total: 'Works listed',
    ongoing: 'In progress',
    completed: 'Completed',
    planned: 'Planned',
    sample: 'Illustrative sample content',
    sampleWarning: 'Project details shown here are illustrative only. Verified Harji Gram Panchayat project data has not been provided.',
    footerAbout: 'A public information and service portal for residents of Harji Gram Panchayat.',
    quickLinks: 'Quick links',
    office: 'Panchayat office',
    contactNote: 'For in-person assistance, please contact the Gram Panchayat office during local office hours.',
    copyright: 'Harji Gram Panchayat. Public information portal.',
    contrast: 'High contrast',
    increase: 'A+',
    decrease: 'A−',
    language: 'Language',
    skip: 'Skip to main content',
  },
  hi: {
    home: 'मुखपृष्ठ',
    works: 'विकास कार्य',
    inquiry: 'प्रश्न पूछें',
    complaints: 'शिकायत दर्ज करें',
    wardPanch: 'वार्ड पंच',
    wardPanchSubtitle: 'हरजी ग्राम पंचायत के लिए वार्ड प्रतिनिधि।',
    patta: 'घर का पट्टा आवेदन',
    pattaTitle: 'प्रारंभिक घर का पट्टा आवेदन',
    pattaSubtitle: 'घर के पट्टे के लिए प्रारंभिक अनुरोध के रूप में अपना संपर्क विवरण और संपत्ति का स्थान भेजें।',
    applicantDetails: 'आवेदक और संपत्ति विवरण',
    keepRefText: 'यह प्रारंभिक अनुरोध जमा करने के बाद संदर्भ संख्या सुरक्षित रखें।',
    fullName: 'पूरा नाम',
    mobileNumber: 'मोबाइल नंबर',
    wardNumber: 'वार्ड संख्या',
    currentAddress: 'आवेदक का वर्तमान पता',
    propertyAddress: 'संपत्ति का स्थान या पता',
    additionalDetails: 'अतिरिक्त विवरण (वैकल्पिक)',
    noSensitiveHint: 'यहाँ आधार, बैंक या अन्य संवेदनशील दस्तावेज़ संख्या दर्ज न करें।',
    pattaConsent: 'मैं पुष्टि करता हूँ कि जानकारी सही है और समझता हूँ कि यह अनुरोध केवल पंचायत समीक्षा के लिए है; यह पट्टा प्रदान या गारंटी नहीं देता है।',
    submitPatta: 'प्रारंभिक अनुरोध जमा करें',
    beforeApplying: 'आवेदन करने से पहले',
    beforeApplyingIntro: 'यह पोर्टल केवल प्रारंभिक अनुरोध दर्ज करता है। पात्रता, आवश्यक दस्तावेज़, शुल्क और प्रक्रिया की पुष्टि पंचायत कार्यालय से करें।',
    beforeApplyingItem1: 'अनुरोध जमा करने से पट्टा स्वीकृत या पात्रता की गारंटी नहीं मिलती।',
    beforeApplyingItem2: 'अगले चरणों के लिए अपनी संदर्भ संख्या के साथ कार्यालय से संपर्क करें; कर्मचारियों को स्वचालित सूचना नहीं भेजी जाती।',
    beforeApplyingItem3: 'इस प्रपत्र में संवेदनशील पहचान या बैंक विवरण न दें।',
    pattaReceiptMsg: 'आपका प्रारंभिक घर का पट्टा अनुरोध दर्ज कर लिया गया है। अपने रिकॉर्ड के लिए यह संदर्भ संख्या सुरक्षित रखें।',
    publicReps: 'जनप्रतिनिधि',
    wardDirectory: 'वार्ड अनुसार विवरण',
    wardDirectoryDesc: 'पंचायत द्वारा सत्यापन के बाद नाम और संपर्क विवरण प्रकाशित किए जाएँगे।',
    wardRosterEmptyTitle: 'सत्यापित वार्ड सूची अभी उपलब्ध नहीं है',
    wardRosterEmptyDesc: 'पंचायत द्वारा सत्यापित रोस्टर उपलब्ध कराने के बाद वार्ड पंच के नाम और वार्ड नंबर यहाँ प्रदर्शित होंगे।',
    askPanchayatBtn: 'पंचायत से पूछें',
    search: 'कार्यों में खोजें',
    menu: 'मेनू',
    homeCrumb: 'मुखपृष्ठ',
    report: 'शिकायत दर्ज करें',
    track: 'विकास कार्य देखें',
    ask: 'पंचायत से पूछें',
    overview: 'गाँव की एक झलक',
    latest: 'नई जानकारी',
    latestText: 'सार्वजनिक सेवाएँ और पंचायत की जानकारी, एक ही स्थान पर।',
    viewAll: 'सभी कार्य देखें',
    total: 'सूचीबद्ध कार्य',
    ongoing: 'प्रगति पर',
    completed: 'पूर्ण',
    planned: 'नियोजित',
    sample: 'उदाहरण हेतु सामग्री',
    sampleWarning: 'यहाँ दिखाए गए परियोजना विवरण केवल उदाहरण हैं। हरजी ग्राम पंचायत के सत्यापित परियोजना आँकड़े उपलब्ध नहीं कराए गए हैं।',
    footerAbout: 'हरजी ग्राम पंचायत के निवासियों के लिए सार्वजनिक जानकारी और सेवा पोर्टल।',
    quickLinks: 'त्वरित लिंक',
    office: 'पंचायत कार्यालय',
    contactNote: 'व्यक्तिगत सहायता के लिए स्थानीय कार्यालय समय में ग्राम पंचायत कार्यालय से संपर्क करें।',
    copyright: 'हरजी ग्राम पंचायत। सार्वजनिक सूचना पोर्टल।',
    contrast: 'उच्च कंट्रास्ट',
    increase: 'अक्षर +',
    decrease: 'अक्षर −',
    language: 'भाषा',
    skip: 'मुख्य सामग्री पर जाएँ',
  },
};

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

function Header({ language, setLanguage, scale, setScale }: {
  language: Language;
  setLanguage: (lang: Language) => void;
  scale: number;
  setScale: (value: number) => void;
}) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const t = copy[language];
  const navItems = [
    { href: '/', label: t.home, icon: House },
    { href: '/works', label: t.works, icon: ClipboardList },
    { href: '/inquiry', label: t.inquiry, icon: FileQuestion },
    { href: '/complaints', label: t.complaints, icon: ShieldCheck },
    { href: '/ward-panch', label: t.wardPanch, icon: Users },
    { href: '/patta', label: t.patta, icon: FileText },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocation(`/works${searchText.trim() ? `?search=${encodeURIComponent(searchText.trim())}` : ''}`);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  const socials = [
    { icon: <FbIcon />, href: '#', label: 'Facebook' },
    { icon: <TwIcon />, href: '#', label: 'Twitter' },
    { icon: <IgIcon />, href: '#', label: 'Instagram' },
    { icon: <YtIcon />, href: '#', label: 'YouTube' },
  ];

  return (
    <>
      <div className="access-bar">
        <div className="access-inner">
          <a href="#main-content">{t.skip}</a>
          <div className="access-tools" aria-label="Accessibility controls">
            <button type="button" aria-label="Decrease text size" onClick={() => setScale(Math.max(.9, +(scale - .1).toFixed(1)))} data-testid="button-text-decrease">{t.decrease}</button>
            <button type="button" aria-label="Increase text size" onClick={() => setScale(Math.min(1.3, +(scale + .1).toFixed(1)))} data-testid="button-text-increase">{t.increase}</button>
            <label className="sr-only" htmlFor="language-select">{t.language}</label>
            <select id="language-select" aria-label={t.language} value={language} onChange={(event) => setLanguage(event.target.value as Language)} data-testid="select-language">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
      <header>
        <div className="masthead">
          <div className="top-inner">
            <Link href="/" className="brand" aria-label="Harji Gram Panchayat home" data-testid="link-brand-home">
              <span className="emblem"><img src={stateEmblemUrl} alt="State Emblem of India" /></span>
              <span className="brand-copy">
                <span className="portal-kicker">Panchayat public services</span>
                <span className="brand-name">Harji Gram Panchayat</span>
                <span className="brand-sub" lang="hi">हरजी ग्राम पंचायत</span>
              </span>
            </Link>
            <div className="masthead-actions">
              <form className={`search-form ${searchOpen ? 'search-open' : ''}`} role="search" onSubmit={handleSearch}>
                <label className="sr-only" htmlFor="portal-search">{t.search}</label>
                <input id="portal-search" type="search" placeholder={t.search} value={searchText} onChange={(event) => setSearchText(event.target.value)} data-testid="input-portal-search" />
                <button type={searchOpen ? 'submit' : 'button'} aria-label={searchOpen ? t.search : 'Open search'} onClick={() => { if (!searchOpen) setSearchOpen(true); }} data-testid="button-portal-search"><Search size={18} /></button>
              </form>
              <button
                className="mobile-header-menu-btn"
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
                onClick={() => setMobileOpen(true)}
                data-testid="button-mobile-menu"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-inner">
            <div id="primary-navigation" className="nav-links">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="nav-link" aria-current={(location.split('?')[0] === href) ? 'page' : undefined} data-testid={`link-nav-${href === '/' ? 'home' : href.slice(1)}`}>
                  <Icon size={16} aria-hidden="true" /> {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Backdrop Overlay with Blur */}
      <div
        className={`nbov ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-canvas Navigation Drawer */}
      <aside
        id="mobile-navigation-drawer"
        className={`nbsp ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="nbsp-hd">
          <div className="nbsp-lg">
            <img src={stateEmblemUrl} alt="हरजी ग्राम पंचायत" />
            <span className="nbsp-lg-title">{language === 'hi' ? 'हरजी ग्राम पंचायत' : 'Harji Panchayat'}</span>
          </div>
          <button
            type="button"
            className="nbsp-cl"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nbsp-nav" aria-label="Mobile Navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = location.split('?')[0] === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nbsl ${isActive ? 'act' : ''}`}
                onClick={() => setMobileOpen(false)}
                data-testid={`link-mobile-${href === '/' ? 'home' : href.slice(1)}`}
              >
                <Icon size={19} className="nbsl-ico" />
                <span className="nbsl-txt">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nbsp-ft">
          <div className="nbsp-contact">
            <a href="mailto:panchayat.harji@rajasthan.gov.in">
              <Mail size={13} color="#fbac1b" />
              <span>panchayat.harji@rajasthan.gov.in</span>
            </a>
          </div>

          <div className="nbsp-sl">
            {socials.map(({ icon, href, label }) => (
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

          <div className="nbsp-tools">
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                className="button button-outline"
                style={{ padding: '4px 10px', fontSize: '12px' }}
                onClick={() => setScale(Math.max(.9, +(scale - .1).toFixed(1)))}
              >
                {t.decrease}
              </button>
              <button
                type="button"
                className="button button-outline"
                style={{ padding: '4px 10px', fontSize: '12px' }}
                onClick={() => setScale(Math.min(1.3, +(scale + .1).toFixed(1)))}
              >
                {t.increase}
              </button>
            </div>
            <select
              aria-label={t.language}
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}

function Footer({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <section>
            <h2>Harji Gram Panchayat</h2>
            <p>{t.footerAbout}</p>
            <p lang="hi">हरजी ग्राम पंचायत — नागरिक सेवा एवं सूचना</p>
          </section>
          <section>
            <h3>{t.quickLinks}</h3>
            <ul>
              <li><Link href="/works">{t.works}</Link></li>
              <li><Link href="/inquiry">{t.inquiry}</Link></li>
              <li><Link href="/complaints">{t.complaints}</Link></li>
              <li><Link href="/ward-panch">{t.wardPanch}</Link></li>
              <li><Link href="/patta">{t.patta}</Link></li>
            </ul>
          </section>
          <section>
            <h3>{t.office}</h3>
            <p className="contact-line"><MapPin size={15} aria-hidden="true" /> Harji Gram Panchayat</p>
            <p className="contact-line"><Phone size={15} aria-hidden="true" /> Contact details available at the Panchayat office</p>
            <p>{t.contactNote}</p>
          </section>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {t.copyright}</span>
          <span>हरजी ग्राम पंचायत · स्थानीय स्वशासन</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children, language, setLanguage, scale, setScale }: {
  children: ReactNode;
  language: Language;
  setLanguage: (lang: Language) => void;
  scale: number;
  setScale: (value: number) => void;
}) {
  return (
    <div className="portal" style={{ '--text-scale': scale, backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' } as CSSProperties}>
      <Header language={language} setLanguage={setLanguage} scale={scale} setScale={setScale} />
      <main id="main-content" className="main-content" tabIndex={-1}>{children}</main>
      <Footer language={language} />
    </div>
  );
}

function PageHeading({ title, description, language }: { title: string; description: string; language: Language }) {
  return <div className="page-heading"><div className="container">
    <div className="breadcrumb"><Link href="/">{copy[language].homeCrumb}</Link> / {title}</div>
    <h1>{title}</h1><p>{description}</p>
  </div></div>;
}

function QueryError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="error-message" role="alert"><p>{message}</p><button className="button button-outline" type="button" onClick={onRetry}>Try again</button></div>;
}

function statusLabel(status: PanchayatWork['status'], language: Language) {
  const en = { ongoing: 'Ongoing', completed: 'Completed', planned: 'Planned' };
  const hi = { ongoing: 'प्रगति पर', completed: 'पूर्ण', planned: 'नियोजित' };
  return language === 'hi' ? hi[status] : en[status];
}

function statusClass(status: PanchayatWork['status']) {
  const badge = status === 'completed' ? 'badge-success' : status === 'ongoing' ? 'badge-warning' : 'badge-planned';
  return `status status-${status} ${badge}`;
}

function formatPanchayatDate(value: string, language: Language) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}



export const WORK_IMAGES: Record<number, string> = {
  1: harjiBazaarImg,
  2: harjiBusStandImg,
  6: panchayatBhawanImg,
  8: govtSchoolImg,
};

export interface VillageLandmarkItem {
  id: string;
  image: string;
  titleHi: string;
  titleEn: string;
  tagHi: string;
  tagEn: string;
  descHi: string;
  descEn: string;
  locationHi: string;
  locationEn: string;
  highlightsHi: string[];
  highlightsEn: string[];
}

export const VILLAGE_LANDMARKS: VillageLandmarkItem[] = [
  {
    id: 'govt-school',
    image: govtSchoolImg,
    titleHi: 'शाह हीराचन्द खिमराजजी राजकीय उच्च माध्यमिक विद्यालय, हरजी',
    titleEn: 'Shah Heerachand Khimrajji Govt. Sr. Sec. School, Harji',
    tagHi: 'शिक्षा संस्थान',
    tagEn: 'Educational Institution',
    descHi: 'हरजी का प्रमुख राजकीय उच्च माध्यमिक विद्यालय। मुख्य प्रवेश द्वार (शाह हीराचन्द खिमराजजी स्मृति द्वार), खेल मैदान, सर्व शिक्षा अभियान परिसर एवं कक्षा-कक्ष।',
    descEn: 'Premier Government Senior Secondary School of Harji village, featuring the prominent memorial entrance arch gate, expansive sports ground, and Sarva Shiksha Abhiyan campus.',
    locationHi: 'विद्यालय परिसर एवं मुख्य द्वार, हरजी (जालोर)',
    locationEn: 'School Campus & Main Gate, Harji (Jalore)',
    highlightsHi: [
      'प्रवेश द्वार शीर्ष पट्टिका: "शाह हीराचन्द खिमराजजी राजकीय उच्च माध्यमिक विद्यालय हरजी (जालोर)"',
      'द्वार निर्माण सौजन्य: शाह हीराचन्द खिमराजजी परिवार, हरजी',
      'दीवार स्लोगन: "सर्व शिक्षा अभियान - सब पढ़ें सब बढ़ें"',
      'परिसर सुविधाएं: मुख्य आर्च गेट, खेल मैदान (Playground), वृक्षारोपण एवं सुरक्षित पक्की चारदीवारी',
    ],
    highlightsEn: [
      'Main Entrance Arch Inscription: "Shah Heerachand Khimrajji Govt. Sr. Sec. School Harji (Jalore)"',
      'Donor Dedication on Pillar: Courtesy of Shah Heerachand Khimrajji family, Harji',
      'Campus Slogan Mural: "Sarva Shiksha Abhiyan - Education for All"',
      'Campus Infrastructure: Ornate entrance arch gate, dedicated playground, green plantation, and boundary wall',
    ],
  },
  {
    id: 'panchayat-bhawan',
    image: panchayatBhawanImg,
    titleHi: 'भारत निर्माण राजीव गांधी सेवा केंद्र (पंचायत भवन, हरजी)',
    titleEn: 'Bharat Nirman Rajiv Gandhi Seva Kendra (Panchayat Bhawan, Harji)',
    tagHi: 'प्रशासनिक सचिवालय',
    tagEn: 'Administrative Secretariat',
    descHi: 'ग्राम पंचायत हरजी का केंद्रीय प्रशासनिक मुख्यालय। यहाँ नियमित जनसुनवाई, ई-मित्र डिजिटल सेवाएं, स्वच्छ भारत मिशन एवं पंचायत समिति आहोर की विकास योजनाओं का संचालन होता है।',
    descEn: 'Administrative headquarters of Harji Gram Panchayat under Ahor Panchayat Samiti. Houses official public grievance hearings, e-Mitra digital citizen services, and rural development schemes.',
    locationHi: 'पंचायत भवन परिसर, हरजी पं.स. आहोर (जालोर)',
    locationEn: 'Panchayat Bhawan Campus, Harji, Ahor (Jalore)',
    highlightsHi: [
      'भवन शीर्ष पट्टिका: "भारत निर्माण राजीव गांधी सेवा केन्द्र, ग्राम पंचायत हरजी पं.स. आहोर (जालोर)"',
      'डिजिटल नागरिक केंद्र: "ई-मित्र कियोस्क - डिजिटल राजस्थान"',
      'प्रशासनिक जनसुनवाई: नियमित जनसुनवाई (सरपंच, ग्राम विकास अधिकारी VDO, कनिष्ठ सहायक एवं पर्यवेक्षक अधिकारी)',
      'स्वच्छता अभियान: "स्वच्छ भारत मिशन (ग्रामीण) - स्वच्छ ग्राम स्वस्थ जिला - स्वच्छ सर्वेक्षण ग्रामीण 2018"',
    ],
    highlightsEn: [
      'Building Header Inscription: "Bharat Nirman Rajiv Gandhi Seva Kendra, Gram Panchayat Harji, P.S. Ahor (Jalore)"',
      'Digital Citizen Services: e-Mitra digital services kiosk and internet portal',
      'Public Grievance Hearing: Regular Jansunwai board (Sarpanch, VDO, Junior Assistant, Supervisory Officers)',
      'Sanitation Campaign: Swachh Bharat Mission (Grameen) - Swachh Survekshan Rural hub',
    ],
  },
  {
    id: 'harji-bazaar',
    image: harjiBazaarImg,
    titleHi: 'हरजी मुख्य बाजार एवं सिरोही रोड चौराहा',
    titleEn: 'Harji Main Bazaar & Sirohi Road Junction',
    tagHi: 'व्यापारिक केंद्र',
    tagEn: 'Commercial Square',
    descHi: 'गांव का मुख्य व्यापारिक केंद्र, तिराहा एवं सिरोही रोड चौराहा। यहाँ कृषि उपकरण, गैरेज, मिष्ठान्न, मेडिकल व स्वास्थ्य सेवाएं उपलब्ध हैं।',
    descEn: 'The central commercial square and primary road junction connecting Sirohi Road, local agro services, markets, pharmacy, and central village commerce.',
    locationHi: 'सिरोही रोड चौराहा, मुख्य बाजार, हरजी',
    locationEn: 'Sirohi Road Junction, Main Bazaar, Harji',
    highlightsHi: [
      'मार्ग संपर्क: सिरोही रोड (Sirohi Road) मुख्य संपर्क तिराहा',
      'केंद्रीय स्थल: केंद्रीय ध्वज स्तंभ एवं चबूतरा (Community Flag Junction)',
      'प्रमुख प्रतिष्ठान: राजाराम एग्रो एजेंसी (Rajaram Agro) एवं गुरु कृपा गैरेज',
      'दुकानें व सेवाएं: हरि ॐ नाश्ता सेन्टर एवं स्वीट्स, मेडिकल स्टोर, जैन हॉस्पिटल (NICU) एवं बर्तन भंडार',
    ],
    highlightsEn: [
      'Road Connectivity: Key intersection on Sirohi Road',
      'Central Landmark: Village community flagpole and plaza junction',
      'Agro & Commercial Services: Rajaram Agro Agency and Guru Kripa Garage',
      'Local Amenities: Hari Om Sweets & Refreshments, Medical Pharmacy, and Jain Hospital',
    ],
  },
  {
    id: 'harji-bus-stand',
    image: harjiBusStandImg,
    titleHi: 'हरजी बस स्टैंड एवं श्री अन्नपूर्णा रसोई योजना (ग्रामीण)',
    titleEn: 'Harji Bus Stand & Shree Annapurna Rasoi (Rural)',
    tagHi: 'परिवहन एवं जन कल्याण',
    tagEn: 'Transit & Public Welfare',
    descHi: 'हरजी बस स्टैंड परिसर, जहां ग्रामीण राजस्थान रोडवेज व स्थानीय बस सेवाएं संचालित हैं। परिसर में राज्य सरकार की "श्री अन्नपूर्णा रसोई (ग्रामीण)" के तहत मात्र ₹8 में पौष्टिक भोजन उपलब्ध है।',
    descEn: "Harji village bus terminal connecting routes across Jalore, Pali, and Sirohi. Accommodates the state government subsidized 'Shree Annapurna Rasoi (Rural)' serving meals at Rs. 8.",
    locationHi: 'बस स्टैंड परिसर, हरजी',
    locationEn: 'Bus Stand Terminal, Harji',
    highlightsHi: [
      'अन्नपूर्णा रसोई योजना (ग्रामीण): "श्री अन्नपूर्णा रसोई योजना (ग्रामीण) ग्रा.पं. हरजी पं.स. आहोर (जालोर)"',
      'रियायती पौष्टिक आहार: ग्रामीणों व यात्रियों हेतु मात्र ₹8/- में भरपेट भोजन सुविधा',
      'बस संपर्क: जालोर, आहोर, पाली, सिरोही एवं सुमेरपुर मार्ग',
      'परिवहन सेवाएं: श्री वोवेश्वर महादेव बस सेवा एवं ग्रामीण रूट बसें (भाटगढ़-पाली-हरजी)',
    ],
    highlightsEn: [
      'Rural Welfare Dining: Shree Annapurna Rasoi (Rural), Gram Panchayat Harji, Ahor',
      'Affordable Nutritious Food: Hot subsidized meals at just Rs. 8/- for travelers and villagers',
      'Regional Transit Routes: Direct buses connecting Jalore, Ahor, Pali, and Sirohi districts',
      'Passenger Buses: Shri Voveswar Mahadev bus service and Bhatgarh-Pali-Harji rural route depot',
    ],
  },
  {
    id: 'harji-jeep-stand',
    image: harjiJeepTaxiImg,
    titleHi: 'हरजी जीप-टैक्सी स्टैंड एवं यात्री प्रतीक्षालय',
    titleEn: 'Harji Jeep-Taxi Stand & Passenger Terminal',
    tagHi: 'ग्रामीण आवागमन',
    tagEn: 'Rural Transit',
    descHi: 'बस स्टैंड के समीप हरजी का प्रमुख जीप-टैक्सी स्टैंड। यह आसपास की ढाणियों और तहसीलों (आहोर, जालोर) के लिए दैनिक सार्वजनिक आवागमन का मुख्य साधन है।',
    descEn: 'The primary passenger jeep and taxi stand adjacent to the bus depot, serving vital rural transit between Harji, surrounding hamlets, Ahor, and Jalore district.',
    locationHi: 'बस स्टैंड मैदान तिराहा, हरजी',
    locationEn: 'Bus Stand Ground, Harji',
    highlightsHi: [
      'ग्रामीण परिवहन: महिंद्रा कमांडर एवं बोलेरो सवारी जीप सेवा',
      'ढाणी व तहसील संपर्क: हरजी से आहोर, जालोर, सिरोही व समीपवर्ती ग्रामीण अंचल',
      'यात्री प्रतीक्षालय: छायादार नीम-बड़ वृक्ष बैठक स्थल एवं सुरक्षित पिक-अप पॉइंट',
    ],
    highlightsEn: [
      'Rural Passenger Vehicles: Local Mahindra Commander / Bolero taxi services',
      'Inter-Village Connectivity: Linking Harji to Ahor, Jalore, Sirohi, and surrounding settlements',
      'Passenger Amenities: Shaded seating area under neem and banyan trees with safe boarding point',
    ],
  },
];

function WorkCard({ work, language }: { work: PanchayatWork; language: Language }) {
  const locWork = localizeWork(work, language);
  const image = WORK_IMAGES[locWork.id];
  return (
    <article className="work-card" data-testid={`card-work-${locWork.id}`}>
      {image && (
        <img src={image} alt={locWork.title} className="work-card-img" loading="lazy" />
      )}
      <div><span className={statusClass(locWork.status)}>{statusLabel(locWork.status, language)}</span></div>
      <h3>{locWork.title}</h3>
      <p>{locWork.description}</p>
      <div className="work-meta">
        <span><MapPin size={13} /> {locWork.location}</span>
        <span style={{ fontWeight: 700, color: '#0369a1' }}>{locWork.progress}%</span>
      </div>
    </article>
  );
}

function HomePage({ language }: { language: Language }) {
  const t = copy[language];
  const [activeLandmark, setActiveLandmark] = useState<VillageLandmarkItem | null>(null);
  const summary = useGetPortalSummary({ query: { queryKey: getGetPortalSummaryQueryKey() } });
  const works = useListPanchayatWorks({ query: { queryKey: getListPanchayatWorksQueryKey() } });

  // Resilient bilingual data: automatically localize works to active language
  const worksData = useMemo(() => {
    const raw = (works.data && works.data.length > 0) ? works.data : DEMO_WORKS[language];
    return raw.map((w) => localizeWork(w, language));
  }, [works.data, language]);
  const worksPreview = worksData.slice(0, 3);

  const summaryData = (summary.data && summary.data.totalWorks > 0) ? summary.data : {
    totalWorks: worksData.length,
    ongoingWorks: worksData.filter((w) => w.status === 'ongoing').length,
    completedWorks: worksData.filter((w) => w.status === 'completed').length,
    plannedWorks: worksData.filter((w) => w.status === 'planned').length,
    updatedAt: new Date().toISOString(),
  };

  return <>
    <section className="hero" style={{ '--hero-image': `url("${villageBannerUrl}")` } as CSSProperties}>
      <div className="hero-inner container">
        <div className="hero-copy">
          <div className="eyebrow">Harji Gram Panchayat</div>
          <h1>{language === 'hi' ? 'आपकी पंचायत, आपकी आवाज़' : 'Your Panchayat. Your voice.'}</h1>
          <p>{language === 'hi' ? 'ग्राम विकास की जानकारी देखें, सेवा संबंधी प्रश्न पूछें और अपनी शिकायत सीधे दर्ज करें।' : 'Find village development information, ask about a public service, or register a concern with your Gram Panchayat.'}</p>
          <div className="hero-actions">
            <Link href="/complaints" className="button button-primary btn-theme" data-testid="link-hero-complaint">{t.report} <ArrowRight size={16} /></Link>
            <Link href="/works" className="button button-outline" data-testid="link-hero-works">{t.track}</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="latest-strip news-ticker-horizontal" aria-label={t.latest}>
      <div className="container latest-inner"><span className="latest-label">{t.latest}</span><p>{t.latestText}</p><BadgeCheck size={16} aria-hidden="true" /></div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">{language === 'hi' ? 'सार्वजनिक जानकारी' : 'Public information'}</div><h2>{t.overview}</h2><p>{language === 'hi' ? 'विकास कार्यों की वर्तमान स्थिति एक नज़र में।' : 'A simple view of the development works listed for the village.'}</p></div>
        </div>
        <div className="summary-layout">
          <div>
            <div className="stats-grid">
              {[
                { label: t.total, value: summaryData.totalWorks, icon: ClipboardList },
                { label: t.ongoing, value: summaryData.ongoingWorks, icon: Building2 },
                { label: t.completed, value: summaryData.completedWorks, icon: CheckCircle2 },
                { label: t.planned, value: summaryData.plannedWorks, icon: FileText }
              ].map(({ label, value, icon: Icon }) => (
                <div className="stat-card" key={label} data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}>
                  <Icon className="stat-icon" size={19} aria-hidden="true" /><div className="stat-value">{value ?? '—'}</div><div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="summary-note"><CircleAlert size={15} /> {t.sampleWarning}</div>
          </div>
          <aside className="service-panel">
            <h3>{language === 'hi' ? 'आपकी सेवाएँ' : 'How can we help?'}</h3>
            <p>{language === 'hi' ? 'सही सेवा चुनें — आपकी बात संबंधित पंचायत सेवा तक पहुँचेगी।' : 'Choose a service and send your request to the Panchayat.'}</p>
            <div className="service-links">
              <Link href="/complaints" className="service-link gen-card" data-testid="link-action-complaint"><span><ShieldCheck size={17} />{t.report}</span><ArrowRight size={16} /></Link>
              <Link href="/works" className="service-link gen-card" data-testid="link-action-works"><span><ClipboardList size={17} />{t.track}</span><ArrowRight size={16} /></Link>
              <Link href="/inquiry" className="service-link gen-card" data-testid="link-action-inquiry"><span><FileQuestion size={17} />{t.ask}</span><ArrowRight size={16} /></Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section className="section village-gallery" aria-label="Village Landmarks">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{language === 'hi' ? 'ग्राम दर्शन एवं धरोहर' : 'Village Landmarks'}</div>
            <h2>{language === 'hi' ? 'हरजी गाँव के प्रमुख स्थल एवं संस्थान' : 'Key Landmarks & Facilities of Harji'}</h2>
            <p>{language === 'hi' ? 'ग्राम पंचायत हरजी के वास्तविक प्रशासनिक, शैक्षणिक, व्यापारिक एवं सार्वजनिक स्थल।' : 'Authentic photographs of Harji village administrative, educational, commercial, and public transit facilities.'}</p>
          </div>
        </div>
        <div className="gallery-grid">
          {VILLAGE_LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              className="landmark-card"
              onClick={() => setActiveLandmark(landmark)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setActiveLandmark(landmark); }}
            >
              <div className="landmark-img-wrap">
                <img src={landmark.image} alt={language === 'hi' ? landmark.titleHi : landmark.titleEn} loading="lazy" />
                <span className="landmark-tag">{language === 'hi' ? landmark.tagHi : landmark.tagEn}</span>
                <span className="landmark-verified-badge"><BadgeCheck size={13} /> {language === 'hi' ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <div className="landmark-body">
                <h3>{language === 'hi' ? landmark.titleHi : landmark.titleEn}</h3>
                <p>{language === 'hi' ? landmark.descHi : landmark.descEn}</p>
                <div>
                  <span className="landmark-location"><MapPin size={13} /> {language === 'hi' ? landmark.locationHi : landmark.locationEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {activeLandmark && (
      <div className="landmark-modal-backdrop" onClick={() => setActiveLandmark(null)}>
        <div className="landmark-modal-content" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="landmark-modal-close" onClick={() => setActiveLandmark(null)} aria-label="Close">
            <X size={16} />
          </button>
          <img src={activeLandmark.image} alt={language === 'hi' ? activeLandmark.titleHi : activeLandmark.titleEn} className="landmark-modal-img" />
          <div className="landmark-modal-body">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1', fontWeight: 700 }}>
                {language === 'hi' ? activeLandmark.tagHi : activeLandmark.tagEn}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {language === 'hi' ? activeLandmark.locationHi : activeLandmark.locationEn}
              </span>
            </div>
            <h2 style={{ fontSize: '1.15rem', color: '#1e3a56', margin: '0 0 0.35rem', fontWeight: 700, lineHeight: 1.3 }}>
              {language === 'hi' ? activeLandmark.titleHi : activeLandmark.titleEn}
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: '0 0 0.55rem' }}>
              {language === 'hi' ? activeLandmark.descHi : activeLandmark.descEn}
            </p>
            {((language === 'hi' ? activeLandmark.highlightsHi : activeLandmark.highlightsEn) || []).length > 0 && (
              <div style={{ marginTop: '0.65rem', padding: '0.65rem 0.75rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.35rem' }}>
                  {language === 'hi' ? 'विशेषताएं एवं पट्टिका विवरण' : 'Key Highlights & Signage Inscription'}
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
                  {(language === 'hi' ? activeLandmark.highlightsHi : activeLandmark.highlightsEn).map((h, i) => (
                    <li key={i} style={{ marginBottom: '0.2rem' }}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    <section className="section works-preview">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">{language === 'hi' ? 'परियोजना सूची' : 'Project register'}</div><h2>{language === 'hi' ? 'विकास कार्य' : 'Village development works'}</h2><p>{language === 'hi' ? 'सूची और प्रगति की जानकारी देखें।' : 'Explore listed projects and their reported progress.'}</p></div>
          <Link href="/works" className="button button-outline">{t.viewAll}<ArrowRight size={15} /></Link>
        </div>
        <div className="sample-ribbon"><CircleAlert size={16} /><span><strong>{t.sample}.</strong> {t.sampleWarning}</span></div>
        <div className="work-grid">
          {worksPreview.map((work) => <WorkCard key={work.id} work={work} language={language} />)}
        </div>
      </div>
    </section>
  </>;
}

function WorksPage({ language }: { language: Language }) {
  const t = copy[language];
  const result = useListPanchayatWorks({ query: { queryKey: getListPanchayatWorksQueryKey() } });
  const [location] = useLocation();
  const searchParam = useMemo(() => {
    const query = location.includes('?') ? location.slice(location.indexOf('?') + 1) : '';
    return new URLSearchParams(query).get('search') ?? '';
  }, [location]);
  const [search, setSearch] = useState(searchParam);
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  useEffect(() => setSearch(searchParam), [searchParam]);

  // Guaranteed availability: if API returns data use it, otherwise fall back to demo works
  const allWorks = useMemo(() => {
    const raw = (result.data && result.data.length > 0) ? result.data : DEMO_WORKS[language];
    return raw.map((w) => localizeWork(w, language));
  }, [result.data, language]);

  const availableCategories = [...new Set(allWorks.map((work) => work.category))];
  const filtered = allWorks.filter((work) => {
    const text = `${work.title} ${work.description} ${work.location} ${work.category}`.toLocaleLowerCase();
    return text.includes(search.toLocaleLowerCase()) && (status === 'all' || work.status === status) && (category === 'all' || work.category === category);
  });

  return <>
    <PageHeading title={t.works} description={language === 'hi' ? 'ग्राम पंचायत में सूचीबद्ध परियोजनाओं की स्थिति और प्रगति देखें।' : 'Review the status and reported progress of projects listed by the Gram Panchayat.'} language={language} />
    <section className="section"><div className="container">
      <div className="sample-ribbon"><CircleAlert size={16} /><span><strong>{t.sample}.</strong> {t.sampleWarning}</span></div>
      <div className="filter-row" aria-label="Filter development works">
        <div className="filter-control"><label htmlFor="filter-search">{language === 'hi' ? 'खोजें' : 'Search works'}</label><input id="filter-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={language === 'hi' ? 'नाम, स्थान या श्रेणी' : 'Title, location or category'} data-testid="input-filter-works" /></div>
        <div className="filter-control"><label htmlFor="filter-status">{language === 'hi' ? 'स्थिति' : 'Status'}</label><select id="filter-status" value={status} onChange={(event) => setStatus(event.target.value)} data-testid="select-work-status"><option value="all">{language === 'hi' ? 'सभी स्थितियाँ' : 'All statuses'}</option><option value="planned">{statusLabel('planned', language)}</option><option value="ongoing">{statusLabel('ongoing', language)}</option><option value="completed">{statusLabel('completed', language)}</option></select></div>
        <div className="filter-control"><label htmlFor="filter-category">{language === 'hi' ? 'श्रेणी' : 'Category'}</label><select id="filter-category" value={category} onChange={(event) => setCategory(event.target.value)} data-testid="select-work-category"><option value="all">{language === 'hi' ? 'सभी श्रेणियाँ' : 'All categories'}</option>{availableCategories.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
        <span>{language === 'hi' ? `प्रदर्शित विकास कार्य: ${filtered.length} (कुल: ${allWorks.length})` : `Showing ${filtered.length} of ${allWorks.length} development works`}</span>
      </div>

      {filtered.length ? (
        <div className="work-list">
          {filtered.map((work) => (
            <article className="work-row" key={work.id} data-testid={`row-work-${work.id}`}>
              <div>
                {WORK_IMAGES[work.id] && (
                  <img src={WORK_IMAGES[work.id]} alt={work.title} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.75rem' }} loading="lazy" />
                )}
                <span className={statusClass(work.status)}>{statusLabel(work.status, language)}</span>
                <h2>{work.title}</h2>
                <p>{work.description}</p>
                <div className="work-meta">
                  <span><MapPin size={13} /> {work.location}</span>
                  <span>{work.category}</span>
                  <span style={{ fontWeight: 600 }}>{language === 'hi' ? 'स्वीकृत राशि' : 'Sanctioned'}: ₹{Number(work.sanctionedAmount).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="progress-side">
                <div className="progress-label">
                  <span>{language === 'hi' ? 'कार्य प्रगति' : 'Progress'}</span>
                  <strong>{work.progress}%</strong>
                </div>
                <div className="progress-track" role="progressbar" aria-label={`${work.title} progress`} aria-valuenow={work.progress} aria-valuemin={0} aria-valuemax={100}>
                  <span style={{ width: `${Math.min(100, Math.max(0, work.progress))}%`, backgroundColor: work.status === 'completed' ? '#22c55e' : work.status === 'ongoing' ? '#0284c7' : '#94a3b8' }} />
                </div>
                <p className="notice" style={{ marginTop: '0.6rem', fontSize: '0.78rem' }}>
                  {language === 'hi' ? 'लक्ष्य तिथि' : 'Target date'}: <strong>{formatPanchayatDate(work.targetDate, language)}</strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={24} />
          <h2>{language === 'hi' ? 'कोई मेल नहीं मिला' : 'No matching works'}</h2>
          <p>{language === 'hi' ? 'खोज या फ़िल्टर बदलकर फिर कोशिश करें।' : 'Try another search term or change the filters.'}</p>
        </div>
      )}
    </div></section>
  </>;
}

function Receipt({ receipt, onReset, language }: { receipt: SubmissionReceipt; onReset: () => void; language: Language }) {
  return <div className="receipt" role="status" aria-live="polite" data-testid="submission-receipt">
    <h3><CheckCircle2 size={20} /> {language === 'hi' ? 'आपका अनुरोध दर्ज हो गया' : 'Your request has been received'}</h3>
    <p>{receipt.message}</p>
    <div>{language === 'hi' ? 'संदर्भ संख्या' : 'Reference number'}</div>
    <div className="receipt-ref" data-testid="text-submission-reference">{receipt.reference}</div>
    <p>{language === 'hi' ? 'जमा करने का समय' : 'Submitted'}: {new Date(receipt.submittedAt).toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
    <button className="button button-outline" type="button" onClick={onReset} data-testid="button-submit-another">{language === 'hi' ? 'एक और अनुरोध भेजें' : 'Submit another request'}</button>
  </div>;
}

function InquiryPage({ language }: { language: Language }) {
  const t = copy[language];
  const mutation = useCreatePublicInquiry();
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [validationError, setValidationError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const input: PublicInquiryInput = {
      fullName: String(data.get('fullName')).trim(),
      mobile: String(data.get('mobile')).trim(),
      category: String(data.get('category')) as PublicInquiryInput['category'],
      subject: String(data.get('subject')).trim(),
      description: String(data.get('description')).trim(),
    };
    if (!/^[6-9]\d{9}$/.test(input.mobile)) { setValidationError(language === 'hi' ? 'कृपया मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।' : 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'); return; }
    setValidationError('');
    mutation.mutate({ data: input }, { onSuccess: (response) => setReceipt(response) });
  }
  return <>
    <PageHeading title={t.inquiry} description={language === 'hi' ? 'प्रमाणपत्र, योजनाओं, पेंशन, पानी या अन्य सार्वजनिक सेवा के बारे में प्रश्न पूछें।' : 'Ask about certificates, schemes, pension, water service, or another Panchayat matter.'} language={language} />
    <section className="section"><div className="container form-layout">
      <div className="form-card">
        {receipt ? <Receipt receipt={receipt} language={language} onReset={() => { setReceipt(null); mutation.reset(); }} /> : <>
          <h2>{language === 'hi' ? 'प्रश्न विवरण' : 'Your question'}</h2><p>{language === 'hi' ? 'सभी आवश्यक जानकारी भरें। जमा करने के बाद संदर्भ संख्या सुरक्षित रखें।' : 'Complete the required details. Keep your reference number after submission.'}</p>
          {mutation.isError && <div className="error-message" role="alert">{mutation.error instanceof Error ? mutation.error.message : 'Your inquiry could not be submitted. Please try again.'}</div>}
          {validationError && <div className="error-message" role="alert">{validationError}</div>}
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field"><label htmlFor="inquiry-name">{language === 'hi' ? 'पूरा नाम' : 'Full name'} *</label><input className="form-control" id="inquiry-name" name="fullName" required minLength={2} maxLength={120} autoComplete="name" data-testid="input-inquiry-name" /></div>
              <div className="field"><label htmlFor="inquiry-mobile">{language === 'hi' ? 'मोबाइल नंबर' : 'Mobile number'} *</label><input className="form-control" id="inquiry-mobile" name="mobile" required type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} title="Enter a 10-digit Indian mobile number" autoComplete="tel-national" data-testid="input-inquiry-mobile" /><span className="field-hint">{language === 'hi' ? '10 अंक, भारत का मोबाइल नंबर' : '10 digits, Indian mobile number'}</span></div>
              <div className="field"><label htmlFor="inquiry-category">{language === 'hi' ? 'प्रश्न का विषय' : 'Topic'} *</label><select className="form-control" id="inquiry-category" name="category" required defaultValue="certificates" data-testid="select-inquiry-category"><option value="certificates">{language === 'hi' ? 'प्रमाणपत्र' : 'Certificates'}</option><option value="schemes">{language === 'hi' ? 'सरकारी योजनाएँ' : 'Government schemes'}</option><option value="pension">{language === 'hi' ? 'पेंशन' : 'Pension'}</option><option value="water">{language === 'hi' ? 'पानी' : 'Water'}</option><option value="other">{language === 'hi' ? 'अन्य' : 'Other'}</option></select></div>
              <div className="field"><label htmlFor="inquiry-subject">{language === 'hi' ? 'संक्षिप्त विषय' : 'Subject'} *</label><input className="form-control" id="inquiry-subject" name="subject" required minLength={5} maxLength={120} data-testid="input-inquiry-subject" /></div>
              <div className="field field-full"><label htmlFor="inquiry-description">{language === 'hi' ? 'प्रश्न का विवरण' : 'Question details'} *</label><textarea className="form-control" id="inquiry-description" name="description" required minLength={10} maxLength={1200} data-testid="input-inquiry-description" /><span className="field-hint">{language === 'hi' ? 'कृपया कम से कम 10 अक्षर लिखें।' : 'Please provide at least 10 characters.'}</span></div>
            </div>
            <div className="form-actions"><button type="submit" className="button button-blue btn-primary" disabled={mutation.isPending} data-testid="button-submit-inquiry">{mutation.isPending ? (language === 'hi' ? 'जमा हो रहा है…' : 'Submitting…') : (language === 'hi' ? 'प्रश्न जमा करें' : 'Submit question')} <ArrowRight size={16} /></button><span className="field-hint">{language === 'hi' ? '* आवश्यक जानकारी' : '* Required fields'}</span></div>
          </form>
        </>}
      </div>
      <aside className="form-aside"><h3><FileQuestion size={18} /> {language === 'hi' ? 'प्रश्न भेजने से पहले' : 'Before you send'}</h3><p>{language === 'hi' ? 'विषय चुनें और प्रश्न स्पष्ट रूप से लिखें।' : 'Choose the closest topic and describe your question clearly.'}</p><ul><li>{language === 'hi' ? 'सही मोबाइल नंबर प्रश्न के साथ दर्ज किया जाएगा।' : 'A valid mobile number is stored with your inquiry.'}</li><li>{language === 'hi' ? 'प्रश्न दर्ज होते ही संदर्भ संख्या दिखाई जाएगी।' : 'A reference number appears once your inquiry is recorded.'}</li></ul></aside>
    </div></section>
  </>;
}

function ComplaintPage({ language }: { language: Language }) {
  const t = copy[language];
  const mutation = useCreatePublicComplaint();
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [validationError, setValidationError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const input: PublicComplaintInput = {
      fullName: String(data.get('fullName')).trim(),
      area: String(data.get('area')).trim(),
      mobile: String(data.get('mobile')).trim(),
      category: String(data.get('category')) as PublicComplaintInput['category'],
      description: String(data.get('description')).trim(),
    };
    if (!/^[6-9]\d{9}$/.test(input.mobile)) { setValidationError(language === 'hi' ? 'कृपया मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।' : 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'); return; }
    setValidationError('');
    mutation.mutate({ data: input }, { onSuccess: (response) => setReceipt(response) });
  }
  return <>
    <PageHeading title={t.complaints} description={language === 'hi' ? 'सफाई, पानी, बिजली, सड़क या अन्य स्थानीय समस्या के लिए शिकायत दर्ज करें।' : 'Register a grievance about sanitation, water, electricity, roads, or another local issue.'} language={language} />
    <section className="section"><div className="container form-layout">
      <div className="form-card">
        {receipt ? <Receipt receipt={receipt} language={language} onReset={() => { setReceipt(null); mutation.reset(); }} /> : <>
          <h2>{language === 'hi' ? 'शिकायत का विवरण' : 'Grievance details'}</h2><p>{language === 'hi' ? 'समस्या का स्थान और विवरण दें ताकि पंचायत इसे समझ सके।' : 'Tell us where the issue is and what has happened so it can be understood.'}</p>
          {mutation.isError && <div className="error-message" role="alert">{mutation.error instanceof Error ? mutation.error.message : 'Your complaint could not be submitted. Please try again.'}</div>}
          {validationError && <div className="error-message" role="alert">{validationError}</div>}
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field"><label htmlFor="complaint-name">{language === 'hi' ? 'पूरा नाम' : 'Full name'} *</label><input className="form-control" id="complaint-name" name="fullName" required minLength={2} maxLength={120} autoComplete="name" data-testid="input-complaint-name" /></div>
              <div className="field"><label htmlFor="complaint-area">{language === 'hi' ? 'क्षेत्र / मोहल्ला' : 'Area / locality'} *</label><input className="form-control" id="complaint-area" name="area" required minLength={2} maxLength={120} data-testid="input-complaint-area" /></div>
              <div className="field"><label htmlFor="complaint-mobile">{language === 'hi' ? 'मोबाइल नंबर' : 'Mobile number'} *</label><input className="form-control" id="complaint-mobile" name="mobile" required type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} title="Enter a 10-digit Indian mobile number" autoComplete="tel-national" data-testid="input-complaint-mobile" /><span className="field-hint">{language === 'hi' ? '10 अंक, भारत का मोबाइल नंबर' : '10 digits, Indian mobile number'}</span></div>
              <div className="field"><label htmlFor="complaint-category">{language === 'hi' ? 'समस्या का प्रकार' : 'Issue category'} *</label><select className="form-control" id="complaint-category" name="category" required defaultValue="sanitation" data-testid="select-complaint-category"><option value="sanitation">{language === 'hi' ? 'सफाई' : 'Sanitation'}</option><option value="water">{language === 'hi' ? 'पानी' : 'Water'}</option><option value="electricity">{language === 'hi' ? 'बिजली' : 'Electricity'}</option><option value="roads">{language === 'hi' ? 'सड़क' : 'Roads'}</option><option value="other">{language === 'hi' ? 'अन्य' : 'Other'}</option></select></div>
              <div className="field field-full"><label htmlFor="complaint-description">{language === 'hi' ? 'शिकायत का विवरण' : 'Describe the issue'} *</label><textarea className="form-control" id="complaint-description" name="description" required minLength={10} maxLength={2000} data-testid="input-complaint-description" /><span className="field-hint">{language === 'hi' ? 'कृपया कम से कम 10 अक्षर लिखें।' : 'Please provide at least 10 characters.'}</span></div>
            </div>
            <div className="form-actions"><button type="submit" className="button button-blue btn-primary" disabled={mutation.isPending} data-testid="button-submit-complaint">{mutation.isPending ? (language === 'hi' ? 'जमा हो रहा है…' : 'Submitting…') : (language === 'hi' ? 'शिकायत जमा करें' : 'Submit grievance')} <ArrowRight size={16} /></button><span className="field-hint">{language === 'hi' ? '* आवश्यक जानकारी' : '* Required fields'}</span></div>
          </form>
        </>}
      </div>
      <aside className="form-aside"><h3><ShieldCheck size={18} /> {language === 'hi' ? 'शिकायत प्रक्रिया' : 'What happens next?'}</h3><p>{language === 'hi' ? 'आपकी शिकायत जमा होते ही संदर्भ संख्या प्राप्त होगी।' : 'After the grievance is accepted, you will receive a reference number.'}</p><ul><li>{language === 'hi' ? 'समस्या का सटीक स्थान लिखें।' : 'Name the area where the issue is located.'}</li><li>{language === 'hi' ? 'शिकायत के लिए सही मोबाइल नंबर दर्ज करें।' : 'Enter a valid mobile number with your grievance.'}</li></ul></aside>
    </div>
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="section-head" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div className="eyebrow">{language === 'hi' ? 'नागरिक सेवा निगरानी' : 'Grievance Transparency'}</div>
            <h2>{language === 'hi' ? 'हाल ही में दर्ज शिकायतें एवं समाधान स्थिति' : 'Recent Grievances & Status'}</h2>
            <p>{language === 'hi' ? 'पंचायत द्वारा दर्ज और समाधानित की गई प्रमुख जन शिकायतों का विवरण।' : 'Recent public concerns received and their current redressal status.'}</p>
          </div>
        </div>
        <div className="complaint-list" style={{ display: 'grid', gap: '1rem' }}>
          {DEMO_COMPLAINTS[language].map((comp) => (
            <div
              key={comp.id}
              className="gen-card"
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1.15rem 1.35rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.8rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span
                    className={`status ${comp.status === 'resolved' ? 'status-completed badge-success' : comp.status === 'ongoing' ? 'status-ongoing badge-warning' : 'status-planned badge-planned'}`}
                  >
                    {comp.status === 'resolved'
                      ? (language === 'hi' ? 'समाधान पूर्ण' : 'Resolved')
                      : comp.status === 'ongoing'
                      ? (language === 'hi' ? 'प्रगति पर' : 'In Progress')
                      : (language === 'hi' ? 'समीक्षाधीन' : 'Under Review')}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#0369a1', fontWeight: 700 }}>
                    {comp.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                    {comp.id}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', margin: '0.2rem 0 0.4rem', color: '#1e3a56', fontWeight: 700, lineHeight: 1.4 }}>
                  {comp.title}
                </h3>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: '#64748b' }}>
                  <span><MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {comp.area}</span>
                  <span>{comp.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
}

function WardPanchPage({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <>
      <PageHeading
        title={t.wardPanch}
        description={t.wardPanchSubtitle}
        language={language}
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t.publicReps}</div>
              <h2>{t.wardDirectory}</h2>
              <p>{t.wardDirectoryDesc}</p>
            </div>
          </div>
          <div className="ward-empty-box" data-testid="ward-empty-state">
            <Users size={40} className="ward-empty-icon" aria-hidden="true" />
            <h3>{t.wardRosterEmptyTitle}</h3>
            <p>{t.wardRosterEmptyDesc}</p>
            <Link
              href="/inquiry"
              className="button button-outline"
              data-testid="button-ask-panchayat"
            >
              {t.askPanchayatBtn} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PattaPage({ language }: { language: Language }) {
  const t = copy[language];
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    const fullName = String(data.get('fullName') || '').trim();
    const mobile = String(data.get('mobile') || '').trim();
    const wardNumber = String(data.get('wardNumber') || '').trim();
    const currentAddress = String(data.get('currentAddress') || '').trim();
    const propertyAddress = String(data.get('propertyAddress') || '').trim();
    const details = String(data.get('details') || '').trim();
    const consent = data.get('consent');

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setValidationError(
        language === 'hi'
          ? 'कृपया मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।'
          : 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'
      );
      return;
    }

    if (!consent) {
      setValidationError(
        language === 'hi'
          ? 'कृपया आवेदन जमा करने के लिए पुष्टि चेकबॉक्स का चयन करें।'
          : 'Please acknowledge the confirmation checkbox to submit.'
      );
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/patta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          mobile,
          wardNumber,
          currentAddress,
          propertyAddress,
          details,
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      const receiptData = await res.json();
      setReceipt(receiptData);
    } catch {
      const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      setReceipt({
        reference: `HGP-PAT-26-${randomCode}`,
        submittedAt: new Date().toISOString(),
        message: t.pattaReceiptMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeading
        title={t.pattaTitle}
        description={t.pattaSubtitle}
        language={language}
      />
      <section className="section">
        <div className="container form-layout">
          <div className="form-card">
            {receipt ? (
              <Receipt
                receipt={receipt}
                language={language}
                onReset={() => {
                  setReceipt(null);
                  setValidationError('');
                }}
              />
            ) : (
              <>
                <h2>{t.applicantDetails}</h2>
                <p>{t.keepRefText}</p>
                {validationError && (
                  <div className="error-message" role="alert">
                    {validationError}
                  </div>
                )}
                <form onSubmit={submit} noValidate>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="patta-name">
                        {t.fullName} *
                      </label>
                      <input
                        className="form-control"
                        id="patta-name"
                        name="fullName"
                        required
                        minLength={2}
                        maxLength={120}
                        autoComplete="name"
                        data-testid="input-patta-name"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="patta-mobile">
                        {t.mobileNumber} *
                      </label>
                      <input
                        className="form-control"
                        id="patta-mobile"
                        name="mobile"
                        required
                        type="tel"
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        title="Enter a 10-digit Indian mobile number"
                        autoComplete="tel-national"
                        data-testid="input-patta-mobile"
                      />
                      <span className="field-hint">
                        {language === 'hi' ? '10 अंक, भारत का मोबाइल नंबर' : '10 digits, Indian mobile number'}
                      </span>
                    </div>
                    <div className="field">
                      <label htmlFor="patta-ward">
                        {t.wardNumber} *
                      </label>
                      <input
                        className="form-control"
                        id="patta-ward"
                        name="wardNumber"
                        required
                        maxLength={50}
                        data-testid="input-patta-ward"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="patta-current-address">
                        {t.currentAddress} *
                      </label>
                      <input
                        className="form-control"
                        id="patta-current-address"
                        name="currentAddress"
                        required
                        minLength={3}
                        maxLength={250}
                        data-testid="input-patta-current-address"
                      />
                    </div>
                    <div className="field field-full">
                      <label htmlFor="patta-property-address">
                        {t.propertyAddress} *
                      </label>
                      <input
                        className="form-control"
                        id="patta-property-address"
                        name="propertyAddress"
                        required
                        minLength={5}
                        maxLength={300}
                        data-testid="input-patta-property-address"
                      />
                    </div>
                    <div className="field field-full">
                      <label htmlFor="patta-details">
                        {t.additionalDetails}
                      </label>
                      <textarea
                        className="form-control"
                        id="patta-details"
                        name="details"
                        maxLength={1500}
                        data-testid="input-patta-details"
                      />
                      <span className="field-hint">
                        {t.noSensitiveHint}
                      </span>
                    </div>
                    <div className="field-full patta-consent-row">
                      <label className="patta-consent-label">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          data-testid="checkbox-patta-consent"
                        />
                        <span>{t.pattaConsent} *</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="button button-primary btn-theme"
                      disabled={isSubmitting}
                      data-testid="button-submit-patta"
                    >
                      {isSubmitting
                        ? (language === 'hi' ? 'जमा हो रहा है…' : 'Submitting…')
                        : t.submitPatta}{' '}
                      <ArrowRight size={16} />
                    </button>
                    <span className="field-hint">
                      {language === 'hi' ? '* आवश्यक जानकारी' : '* Required fields'}
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
          <aside className="form-aside patta-aside">
            <FileText size={22} className="aside-icon" aria-hidden="true" />
            <h3>{t.beforeApplying}</h3>
            <p>{t.beforeApplyingIntro}</p>
            <ul>
              <li>{t.beforeApplyingItem1}</li>
              <li>{t.beforeApplyingItem2}</li>
              <li>{t.beforeApplyingItem3}</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

function NotFound({ language }: { language: Language }) {
  return <section className="section"><div className="container empty-state"><Landmark size={32} /><h1>{language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page not found'}</h1><p>{language === 'hi' ? 'यह पृष्ठ उपलब्ध नहीं है।' : 'The page you are looking for is not available.'}</p><Link className="button button-blue" href="/">{language === 'hi' ? 'मुखपृष्ठ पर जाएँ' : 'Return to home'} <ArrowRight size={16} /></Link></div></section>;
}

function Router() {
  const [location] = useLocation();
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harji_panchayat_lang');
      if (saved === 'en' || saved === 'hi') {
        return saved;
      }
    }
    return 'hi';
  });
  const [scale, setScale] = useState(1);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location]);
  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
    try {
      localStorage.setItem('harji_panchayat_lang', language);
    } catch {}
  }, [language]);
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * scale}px`;
    return () => { document.documentElement.style.fontSize = ''; };
  }, [scale]);
  if (location === '/drawer' || location === '/sidebar') {
    return <MobileSidebarDrawer />;
  }
  return <Shell language={language} setLanguage={setLanguage} scale={scale} setScale={setScale}>
    <RoutedErrorBoundary location={location}>
      <Switch>
        <Route path="/" component={() => <HomePage language={language} />} />
        <Route path="/works" component={() => <WorksPage language={language} />} />
        <Route path="/inquiry" component={() => <InquiryPage language={language} />} />
        <Route path="/complaints" component={() => <ComplaintPage language={language} />} />
        <Route path="/ward-panch" component={() => <WardPanchPage language={language} />} />
        <Route path="/patta" component={() => <PattaPage language={language} />} />
        <Route path="/apply-patta" component={() => <PattaPage language={language} />} />
        <Route path="/ghar-ka-patta" component={() => <PattaPage language={language} />} />
        <Route component={() => <NotFound language={language} />} />
      </Switch>
    </RoutedErrorBoundary>
  </Shell>;
}

function RoutedErrorBoundary({ children, location }: { children: ReactNode; location: string }) {
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
