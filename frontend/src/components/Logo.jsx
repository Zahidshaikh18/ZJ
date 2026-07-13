import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link
      to="/"
      data-testid="brand-logo"
      className="flex items-center gap-2.5 group"
      aria-label="ZJ Infosystem — Home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white font-display font-bold text-[15px] shadow-[0_8px_24px_-8px_hsl(207_100%_45%_/_0.6)] transition-transform group-hover:scale-105">
        ZJ
        <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-white ring-2 ring-background" aria-hidden />
      </span>
      {!compact && (
        <span className="font-display font-semibold tracking-tight text-[17px] leading-none">
          <span className="text-foreground">ZJ</span>{" "}
          <span className="text-muted-foreground">Infosystem</span>
        </span>
      )}
    </Link>
  );
}
