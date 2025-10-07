import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">NYC Web Design</h3>
            <p className="text-primary-foreground/80 text-sm">
              Professional web design services for local businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Portfolio
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Business Websites</li>
              <li>E-commerce Sites</li>
              <li>Booking Systems</li>
              <li>Portfolio Sites</li>
              <li>Landing Pages</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-accent" />
                <span>New York City, NY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:nycwebsitebuilder@gmail.com" className="hover:text-accent transition-colors">
                  nycwebsitebuilder@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+19293457714" className="hover:text-accent transition-colors">
                  (929) 345-7714
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} NYC Web Design. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
