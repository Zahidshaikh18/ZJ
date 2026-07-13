import { Link } from "react-router-dom";
import { COMPANY, SERVICES } from "@/lib/company";
import Logo from "@/components/Logo";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="mt-32 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            {COMPANY.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={COMPANY.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              data-testid="social-linkedin"
              className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={COMPANY.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"
              data-testid="social-twitter"
              className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href={COMPANY.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
              data-testid="social-facebook"
              className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground">About Us</Link></li>
            <li><Link to="/why-us" className="hover:text-foreground text-muted-foreground">Why Choose Us</Link></li>
            <li><Link to="/industries" className="hover:text-foreground text-muted-foreground">Industries</Link></li>
            <li><Link to="/technologies" className="hover:text-foreground text-muted-foreground">Technologies</Link></li>
            <li><Link to="/contact" className="hover:text-foreground text-muted-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-3 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to="/services" className="hover:text-foreground text-muted-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /><span>{COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.state}</span></li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0" /><a href={`tel:${COMPANY.phone}`} className="hover:text-foreground">{COMPANY.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0" /><a href={`mailto:${COMPANY.email}`} className="hover:text-foreground">{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Made in Pune · India</span>
        </div>
      </div>
    </footer>
  );
}
