import { Wallet } from "lucide-react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
] as const;

const Navigation = () => {
  const matchRoute = useMatchRoute();

  return (
    <nav className="px-4 md:px-6 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-stretch gap-8">
          <div className="flex items-center gap-2 py-4">
            <Wallet width={24} height={24} stroke="var(--primary)" />
            <span className="text-lg md:text-[20px] font-bold">Web3 Hub</span>
          </div>

          <ul className="hidden md:flex items-stretch gap-6">
            {navLinks.map((link) => {
              const isActive = matchRoute({ to: link.to });
              return (
                <li
                  key={link.to}
                  className={`flex items-center mb-1 transition-colors relative ${
                    isActive
                      ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : ""
                  }`}
                >
                  <Link
                    to={link.to}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
