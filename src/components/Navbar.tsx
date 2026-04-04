import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/ikigai-logo-white.jpeg";

const navItems = [
  {
    label: "About",
    path: "/about",
    children: ["Vision & Mission", "Grounding Philosophy", "Core Values", "The Journey", "Founder & Team"],
  },
  {
    label: "Teenzone",
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
    path: "/resources",
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Ikigai Teen" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-display text-lg font-semibold text-foreground">Ikigai Teen</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link to={item.path} className="nav-link flex items-center gap-1 px-4 py-2 font-body">
                {item.label}
                <ChevronDown className="w-3 h-3" />
              </Link>
              <AnimatePresence>
                {openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 min-w-[220px] bg-card border border-border rounded-lg shadow-xl py-2"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child}
                        to={item.path}
                        className="block px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors"
                      >
                        {child}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <a href="#" className="hidden lg:inline-flex px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold font-body hover:opacity-90 transition-opacity">
          Contact Us
        </a>

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
                          <Link key={child} to={item.path} className="block py-2 text-sm text-muted-foreground hover:text-primary font-body" onClick={() => setMobileOpen(false)}>
                            {child}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <a href="#" className="block mt-4 text-center px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold font-body">
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
