import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, PhoneCall, Youtube } from "lucide-react";
import logo from "@/assets/ikigai logo no bg.png";
import { navItems } from "@/components/Navbar";
import TiltedDock, { type TiltedDockItem } from "@/components/ui/tilted-dock";

const contactDockItems: TiltedDockItem[] = [
  { id: 1, icon: <Instagram size={28} />, label: "Instagram", href: "https://www.instagram.com/", external: true },
  { id: 2, icon: <Facebook size={28} />, label: "Facebook", href: "https://www.facebook.com/", external: true },
  { id: 3, icon: <PhoneCall size={28} />, label: "Phone", href: "tel:+15551234567" },
  { id: 4, icon: <Mail size={28} />, label: "Email", href: "mailto:hello@ikigaiteen.org" },
  { id: 5, icon: <Youtube size={28} />, label: "YouTube", href: "https://www.youtube.com/", external: true },
  { id: 6, icon: <Linkedin size={28} />, label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
];

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getChildPath = (groupLabel: string, childLabel: string, fallbackPath: string) => {
    if (groupLabel === "Resources" && childLabel === "Blog/Articles") {
      return "/resources/blogs";
    }

    if (groupLabel === "Resources" && childLabel === "Video/Podcast Links") {
      return "/resources/videos";
    }

    return fallbackPath;
  };

  return (
    <footer id="contact" className="bg-card border-t border-border py-12 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Ikigai Teen" className="h-10 w-10 rounded-lg object-cover" />
              <span className="font-display text-lg font-semibold text-foreground">Ikigai Teen</span>
            </div>

            <div className="text-sm text-muted-foreground font-body leading-relaxed">
              <p>Empowering teens to discover purpose.</p>
              <p>Building a meaningful future through identity.</p>
              <p>Growing with guidance, confidence, and community.</p>
            </div>

            <div className="space-y-2">
              {navItems.map((group) => (
                <div key={group.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between max-w-xs font-display text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === group.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === group.label && (
                    <div className="mt-2 pl-3 border-l border-border/70 space-y-1.5">
                      {group.children.map((child) => (
                        <Link
                          key={child}
                          to={getChildPath(group.label, child, group.path)}
                          className="block text-xs font-body text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:pl-8">
            <h3 className="font-display text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-2 text-sm font-body text-foreground/85">
              <p><span className="text-foreground font-semibold">Email:</span> hello@ikigaiteen.org</p>
              <p><span className="text-foreground font-semibold">Phone:</span> +91 12345 67890</p>
              <p><span className="text-foreground font-semibold">Address:</span> 123 bengaluru, karnataka</p>
            </div>
            <TiltedDock className="pt-6 justify-start" items={contactDockItems} />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/70 flex items-center justify-center">
          <p className="text-sm text-muted-foreground font-body text-center">
            © {new Date().getFullYear()} Ikigai Teen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
