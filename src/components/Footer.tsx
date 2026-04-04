import logo from "@/assets/ikigai-logo-white.jpeg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ikigai Teen" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-display text-lg font-semibold text-foreground">Ikigai Teen</span>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} Ikigai Teen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
