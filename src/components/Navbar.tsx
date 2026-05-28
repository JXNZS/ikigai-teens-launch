import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut, type AnimationGeneratorType } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/ikigai logo no bg.png";
import { LetterSwapPingPong } from "@/components/ui/letter-swap";
import NavHeader from "@/components/ui/nav-header";

const NAVBAR_OPEN_EVENT = "ikigai:openNavbarDropdown";
const DARK_SECTION_CLASSES = ["hero-theme-legacy", "content-theme-legacy", "footer-theme-legacy", "navbar-theme-legacy"];

export const navItems = [
  {
    label: "About",
    path: "/about",
    children: ["Vision, Mission & Values", "Grounding Philosophy", "The Journey", "Architects of Ikigai Teen"],
  },
  {
    label: "Teen Zone",
    path: "/teenzone",
    children: ["Know Yourself", "Teen Toolkit", "Ikigai Teen Club", "Ikigai Teen App"],
  },
  {
    label: "Parent Hub",
    path: "/parent-hub",
    children: ["Parent Role", "Parent Challenges", "Parent Collab", "Ikigai Teen Parent Circle"],
  },
  {
    label: "Resources",
    path: "/resources/blogs",
    children: ["Blog/Articles", "Video/Podcast Links", "Ready to Use Tools", "Recent Events", "Upcoming Events"],
  },
  {
    label: "Get Involved",
    path: "/get-involved",
    children: ["Be Our Expert/Guest Speaker", "Be Our Service Collaborator", "Be Our Trainee Coach", "Be Our Intern/Volunteer", "Be Our Patron/Sponserer"],
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useLightNavbarSurface, setUseLightNavbarSurface] = useState(true);
  const [dropdownAnchorX, setDropdownAnchorX] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'kannada'>('english');
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const normalizeHeaderLabel = (label?: string | null) => {
    if (label === "Teenzone") {
      return "Teen Zone";
    }
    return label ?? null;
  };

  useEffect(() => {
    const state = location.state as { openNav?: string } | null;
    if (!state?.openNav) return;

    const normalized = normalizeHeaderLabel(state.openNav);
    const match = navItems.find((item) => item.label === normalized);
    if (match) {
      setOpenDropdown(match.label);
    }
  }, [location.key, location.state]);

  useEffect(() => {
    const handleOpenFromCTA = (event: Event) => {
      const customEvent = event as CustomEvent<{ label?: string }>;
      const label = normalizeHeaderLabel(customEvent.detail?.label);
      if (!label) return;

      const match = navItems.find((item) => item.label === label);
      if (match) {
        setOpenDropdown(match.label);
      }
    };

    window.addEventListener(NAVBAR_OPEN_EVENT, handleOpenFromCTA);
    return () => window.removeEventListener(NAVBAR_OPEN_EVENT, handleOpenFromCTA);
  }, []);

  useEffect(() => {
    const updateAnchor = () => {
      if (!openDropdown || !desktopNavRef.current) {
        setDropdownAnchorX(null);
        return;
      }

      const activeTab = desktopNavRef.current.querySelector<HTMLElement>(`[data-nav-tab="${openDropdown}"]`);
      if (!activeTab) {
        setDropdownAnchorX(null);
        return;
      }

      setDropdownAnchorX(activeTab.offsetLeft + activeTab.offsetWidth / 2);
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    return () => window.removeEventListener("resize", updateAnchor);
  }, [openDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdown(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Keep the navbar surface consistent with the hero section.
  // Previously the navbar updated on scroll to sample page sections; disable that
  // behavior and force the light/hero surface so the navbar color doesn't change.
  useEffect(() => {
    setUseLightNavbarSurface(true);
  }, []);

  const [contactActive, setContactActive] = useState(false);
  const [showLanguageSoon, setShowLanguageSoon] = useState(false);
  const activeDesktopItem = navItems.find((item) => item.label === openDropdown) ?? null;

  const handleLanguageClick = () => {
    // Don't change the selected language yet — only show the "Coming soon" popup
    setShowLanguageSoon(true);
    window.setTimeout(() => {
      setShowLanguageSoon(false);
    }, 1500);
  };

  const getChildPath = (parentLabel: string, childLabel: string, fallbackPath: string) => {
    if (parentLabel === "About" && childLabel === "Architects of Ikigai Teen") {
      return "/about/founder-team";
    }

    if (parentLabel === "About" && childLabel === "Grounding Philosophy") {
      return "/about/grounding-philosophy";
    }

    if (parentLabel === "About" && childLabel === "The Journey") {
      return "/about/journey";
    }

    if (parentLabel === "About" && childLabel === "Vision, Mission & Values") {
      return "/about/values-vision-mission";
    }

    if (parentLabel === "Teen Zone" && childLabel === "Know Yourself") {
      return "/teenzone/know-yourself";
    }

    if (parentLabel === "Teen Zone" && childLabel === "Teen Toolkit") {
      return "/teenzone/teen-toolkit";
    }

    if (parentLabel === "Teen Zone" && childLabel === "Ikigai Teen Club") {
      return "/teenzone/ikigai-teen-club";
    }

    if (parentLabel === "Teen Zone" && childLabel === "Ikigai Teen App") {
      return "/teenzone/ikigai-teen-app";
    }

    if (parentLabel === "Parent Hub" && childLabel === "Parent Role") {
      return "/parent-hub/parent-role";
    }

    if (parentLabel === "Parent Hub" && childLabel === "Parent Challenges") {
      return "/parent-hub/parent-challenges";
    }

    if (parentLabel === "Parent Hub" && childLabel === "Parent Collab") {
      return "/parent-hub/parent-collab";
    }

    if (parentLabel === "Parent Hub" && childLabel === "Ikigai Teen Parent Circle") {
      return "/parent-hub/parent-circle";
    }

    if (parentLabel === "Resources" && childLabel === "Blog/Articles") {
      return "/resources/blogs";
    }

    if (parentLabel === "Resources" && childLabel === "Video/Podcast Links") {
      return "/resources/videos";
    }

    if (parentLabel === "Resources" && childLabel === "Ready to Use Tools") {
      return "/resources/ready-to-use-tools";
    }

    if (parentLabel === "Resources" && childLabel === "Recent Events") {
      return "/resources/recent-events";
    }

    if (parentLabel === "Resources" && childLabel === "Upcoming Events") {
      return "/resources/upcoming-events";
    }

    if (parentLabel === "Get Involved" && childLabel === "Be Our Expert/Guest Speaker") {
      return "/get-involved/be-our-experts";
    }

    if (parentLabel === "Get Involved" && childLabel === "Be Our Service Collaborator") {
      return "/get-involved/be-our-collaborators";
    }

    if (parentLabel === "Get Involved" && childLabel === "Be Our Trainee Coach") {
      return "/get-involved/be-our-trainee-coaches";
    }

    if (parentLabel === "Get Involved" && childLabel === "Be Our Intern/Volunteer") {
      return "/get-involved/be-our-interns-guests";
    }

    if (parentLabel === "Get Involved" && childLabel === "Be Our Patron/Sponserer") {
      return "/get-involved/be-our-patrons";
    }

    return fallbackPath;
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      rotateX: -8,
      filter: "blur(6px)",
      transition: { duration: 0.18, ease: easeInOut },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: 'spring' as AnimationGeneratorType,
        stiffness: 420,
        damping: 26,
        mass: 0.7,
        staggerChildren: 0.045,
        delayChildren: 0.04,
      },
    },
  };

  const dropdownItemVariants = {
    closed: { opacity: 0, x: -8, y: 4 },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring' as AnimationGeneratorType, stiffness: 380, damping: 22, mass: 0.6 },
    },
  };

  const handleDesktopHeaderClick = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const navbarThemeClass = useLightNavbarSurface
    ? "bg-[hsl(25_83%_93%_/_0.92)] border-[rgba(44,66,63,0.7)]"
    : "footer-theme-legacy bg-card border-border/50";

  const logoClass = useLightNavbarSurface
    ? "h-full w-full object-cover object-top scale-[1.22] origin-top [filter:brightness(0)_saturate(100%)_invert(21%)_sepia(35%)_saturate(636%)_hue-rotate(122deg)_brightness(95%)_contrast(93%)] drop-shadow-[0_0_8px_rgba(44,66,63,0.25)]"
    : "h-full w-full object-cover object-top scale-[1.22] origin-top drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]";

  return (
    <nav className={`navbar-theme-legacy fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${navbarThemeClass}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <div className="h-12 w-12 md:h-[6.75rem] md:w-[6.75rem] shrink-0 overflow-hidden rounded-lg">
            <div
              aria-hidden
              className="h-full w-full"
              style={{
                backgroundColor: "#2C423F",
                WebkitMaskImage: `url(${logo})`,
                maskImage: `url(${logo})`,
                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                filter: "drop-shadow(0 0 8px rgba(44,66,63,0.25))",
              }}
            />
            <img src={logo} alt="Ikigai Teen" className="sr-only" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div ref={desktopNavRef} className="hidden lg:flex relative">
          <NavHeader 
            items={!isHomePage ? ["Home", ...navItems.map((item) => item.label)] : navItems.map((item) => item.label)} 
            activeItem={openDropdown} 
            onItemClick={(label) => {
              if (label === "Home") {
                window.location.href = "/";
              } else {
                handleDesktopHeaderClick(label);
              }
            }} 
          />

          <AnimatePresence mode="wait">
            {activeDesktopItem && dropdownAnchorX !== null && (
              <motion.div
                key={activeDesktopItem.label}
                initial="closed"
                animate="open"
                exit="closed"
                variants={dropdownVariants}
                style={{ left: dropdownAnchorX, transformPerspective: 1000, transformOrigin: "top center" }}
                className="absolute top-full mt-2 min-w-[260px] -translate-x-1/2 bg-card border border-border rounded-lg shadow-xl py-2"
              >
                {activeDesktopItem.children.map((child) => (
                  <motion.div key={child} variants={dropdownItemVariants}>
                    <Link
                      to={getChildPath(activeDesktopItem.label, child, activeDesktopItem.path)}
                      className="block px-4 py-2.5 text-sm font-body text-[#FCEADE] hover:text-[#FCEADE]/80 hover:bg-secondary/50 transition-colors"
                    >
                      {child}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={handleLanguageClick}
              aria-label="Switch language"
              className="relative inline-flex h-9 w-[132px] items-center overflow-hidden rounded-full border border-[rgba(44,66,63,0.35)] text-[13px] font-semibold transition-colors"
              style={{ backgroundColor: "#FCEADE" }}
            >
              <span
                className="absolute inset-y-0 left-0 w-1/2 z-0 transition-colors"
                style={{ backgroundColor: '#2C423F' }}
              />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-px z-10" style={{ backgroundColor: '#2C423F' }} />
              <span 
                className="relative z-20 w-1/2 text-center font-semibold transition-colors"
                style={{ color: '#FCEADE' }}
              >
                English
              </span>
              <span 
                className="relative z-20 w-1/2 text-center font-semibold transition-colors"
                style={{ color: '#2C423F' }}
              >
                ಕನ್ನಡ
              </span>
            </button>
            <div
              className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm transition-all duration-200 ${showLanguageSoon ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
            >
              Coming soon
            </div>
          </div>

          <motion.div
            animate={{ scale: contactActive ? 1.03 : 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => setContactActive(true)}
            onMouseLeave={() => setContactActive(false)}
          >
            <Link
              to="/#contact"
              className={`inline-flex px-5 py-2 rounded-full text-sm font-semibold font-body transition-all duration-300 ${
                contactActive ? "ring-2 ring-[rgba(44,66,63,0.5)]" : ""
              }`}
              style={{ backgroundColor: "#2C423F", color: "#FCEADE" }}
            >
              <LetterSwapPingPong label="Contact Us" className="justify-center" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" color="#2C423F" /> : <Menu className="w-6 h-6" color="#2C423F" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-t border-border max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 md:px-6 py-4 space-y-1">
              {!isHomePage && (
                <Link
                  to="/"
                  className="block py-2.5 px-2 text-foreground/80 font-body text-xs md:text-sm uppercase tracking-wide hover:bg-secondary/50 rounded transition-colors font-semibold border-b border-[rgba(0,0,0,0.1)] mb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
              )}
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-foreground/80 font-body text-xs md:text-sm uppercase tracking-wide hover:bg-secondary/50 rounded transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden pl-4"
                      >
                        {item.children.map((child) => (
                          <Link key={child} to={getChildPath(item.label, child, item.path)} className="block py-1.5 px-2 text-xs md:text-sm text-[#FCEADE] hover:text-[#FCEADE] font-body rounded transition-colors" onClick={() => setMobileOpen(false)}>
                            {child}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleLanguageClick}
                    aria-label="Switch language"
                    className="relative inline-flex h-9 w-[132px] items-center overflow-hidden rounded-full border border-[rgba(44,66,63,0.35)] text-[13px] font-semibold transition-colors"
                    style={{ backgroundColor: "#FCEADE" }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1/2 z-0 transition-colors"
                      style={{ backgroundColor: '#2C423F' }}
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-px z-10" style={{ backgroundColor: '#2C423F' }} />
                    <span 
                      className="relative z-20 w-1/2 text-center font-semibold transition-colors"
                      style={{ color: '#FCEADE' }}
                    >
                      English
                    </span>
                    <span 
                      className="relative z-20 w-1/2 text-center font-semibold transition-colors"
                      style={{ color: '#2C423F' }}
                    >
                      ಕನ್ನಡ
                    </span>
                  </button>
                  <div
                    className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/70 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm transition-all duration-200 ${showLanguageSoon ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
                  >
                    Coming soon
                  </div>
                </div>

                <Link to="/#contact" className="block text-center px-4 py-2 rounded-full text-xs md:text-sm font-semibold font-body" style={{ backgroundColor: "#FCEADE", color: "#000000" }} onClick={() => setMobileOpen(false)}>
                  <LetterSwapPingPong label="Contact Us" className="justify-center" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
