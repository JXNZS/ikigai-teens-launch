import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/ikigai logo no bg.png";
import { LetterSwapPingPong } from "@/components/ui/letter-swap";
import NavHeader from "@/components/ui/nav-header";

const NAVBAR_OPEN_EVENT = "ikigai:openNavbarDropdown";

export const navItems = [
  {
    label: "About",
    path: "/about",
    children: ["Values, Vision & Mission", "Grounding Philosophy", "The Journey", "Founder & Team"],
  },
  {
    label: "Teen Zone",
    path: "/teenzone",
    children: ["Teen Identity", "Teen Issues", "Teen Solutions", "Teen Resources", "IkigaiTeen Club & App"],
  },
  {
    label: "Parent Hub",
    path: "/parent-hub",
    children: ["Parent Role", "Parent Challenges", "Parent Collab", "IkigaiTeen Parent Circle"],
  },
  {
    label: "Resources",
    path: "/resources/blogs",
    children: ["Blog/Articles", "Video/Podcast Links", "Recent Events", "Upcoming Events", "IkigaiTeen Facts & Stats"],
  },
  {
    label: "Get Involved",
    path: "/get-involved",
    children: ["Be Our Experts", "Be Our Collaborators", "Be Our Trainee Coaches", "Be Our Interns/Guests", "Be Our Patrons", "IkigaiTeen Patrons"],
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownAnchorX, setDropdownAnchorX] = useState<number | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  const [contactActive, setContactActive] = useState(false);
  const activeDesktopItem = navItems.find((item) => item.label === openDropdown) ?? null;

  const getChildPath = (parentLabel: string, childLabel: string, fallbackPath: string) => {
    if (parentLabel === "About" && childLabel === "Founder & Team") {
      return "/about/founder-team";
    }

    if (parentLabel === "About" && childLabel === "Grounding Philosophy") {
      return "/about/grounding-philosophy";
    }

    if (parentLabel === "About" && childLabel === "Values, Vision & Mission") {
      return "/about/values-vision-mission";
    }

    if (parentLabel === "Resources" && childLabel === "Blog/Articles") {
      return "/resources/blogs";
    }

    if (parentLabel === "Resources" && childLabel === "Video/Podcast Links") {
      return "/resources/videos";
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
      transition: { duration: 0.18, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
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
      transition: { type: "spring", stiffness: 380, damping: 22, mass: 0.6 },
    },
  };

  const handleDesktopHeaderClick = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="navbar-theme-legacy fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Ikigai Teen" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-display text-lg font-semibold text-foreground">Ikigai Teen</span>
        </Link>

        {/* Desktop Nav */}
        <div ref={desktopNavRef} className="hidden lg:flex relative">
          <NavHeader items={navItems.map((item) => item.label)} activeItem={openDropdown} onItemClick={handleDesktopHeaderClick} />

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
                      className="block px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {child}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="hidden lg:block"
          animate={{ scale: contactActive ? 1.03 : 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setContactActive(true)}
          onMouseLeave={() => setContactActive(false)}
        >
          <Link
            to="/#contact"
            className={`inline-flex px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold font-body transition-all duration-300 ${
              contactActive ? "ring-2 ring-primary/50" : ""
            }`}
          >
            <LetterSwapPingPong label="Contact Us" className="justify-center" />
          </Link>
        </motion.div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between py-2 text-foreground/80 font-body text-sm uppercase tracking-wide"
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
                          <Link key={child} to={getChildPath(item.label, child, item.path)} className="block py-2 text-sm text-muted-foreground hover:text-primary font-body" onClick={() => setMobileOpen(false)}>
                            {child}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link to="/#contact" className="block mt-4 text-center px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold font-body" onClick={() => setMobileOpen(false)}>
                <LetterSwapPingPong label="Contact Us" className="justify-center" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
