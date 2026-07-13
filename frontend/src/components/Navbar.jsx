import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/why-us", label: "Why Us" },
  { to: "/technologies", label: "Technologies" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolved } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ThemeIcon = theme === "system" ? Monitor : resolved === "dark" ? Moon : Sun;

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `link-underline text-sm font-medium tracking-tight transition-colors ${
                  isActive ? "text-foreground active" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="theme-toggle"
                className="h-10 w-10 rounded-lg border border-border/70 bg-background/50 hover:bg-secondary transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <ThemeIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem data-testid="theme-light" onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" /> Light
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="theme-dark" onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" /> Dark
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="theme-system" onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" /> Auto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/contact" className="hidden lg:inline-flex">
            <Button
              data-testid="nav-cta-contact"
              className="rounded-full px-5 bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white shadow-[0_10px_30px_-10px_hsl(207_100%_45%_/_0.55)] hover:opacity-95 transition-opacity"
            >
              Get in touch
            </Button>
          </Link>

          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden h-10 w-10 rounded-lg border border-border/70 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/60"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `text-base font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white">
                  Get in touch
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
