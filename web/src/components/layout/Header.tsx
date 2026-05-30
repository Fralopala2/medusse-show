"use client";

import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { scrollToHash } from "@/lib/scroll-to-hash";
import { Menu, X, User } from "lucide-react";
import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const isHomePage = pathname === "/";
  const isMarketing = pathname === "/" || pathname === "/capturas";

  const navLinks = [
    { name: "Dashboard", href: isHomePage ? "#dashboard" : "/#dashboard" },
    { name: "Soluciones", href: isHomePage ? "#soluciones" : "/#soluciones" },
    { name: "Tecnología", href: isHomePage ? "#tecnologia" : "/#tecnologia" },
    { name: "Precios", href: isHomePage ? "#precios" : "/#precios" },
    { name: "Contacto", href: isHomePage ? "#contacto" : "/#contacto" },
  ];

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleAnchorNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) {
        closeMobileMenu();
        return;
      }

      const hash = href.slice(hashIndex);
      const pathPart = href.slice(0, hashIndex) || pathname;

      if (pathPart && pathPart !== "/" && pathPart !== pathname) {
        closeMobileMenu();
        return;
      }

      if (isHomePage || pathname === "/") {
        e.preventDefault();
        closeMobileMenu();
        scrollToHash(hash);
        return;
      }

      if (href.startsWith("/#")) {
        e.preventDefault();
        closeMobileMenu();
        router.push(href);
      }
    },
    [closeMobileMenu, isHomePage, pathname, router]
  );

  const handleBrandNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isHomePage) {
        closeMobileMenu();
        return;
      }

      e.preventDefault();
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [closeMobileMenu, isHomePage]
  );

  const authLinkClass = cn(
    buttonVariants({
      variant: isMarketing ? "outline" : "default",
      size: "sm",
    }),
    "hidden sm:inline-flex items-center gap-2",
    isMarketing && "border-cinematic-accent/50 text-white hover:bg-white/10"
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-[100] w-full transition-all duration-500",
          isMarketing
            ? cn(
                "glass-header text-white",
                scrolled && "shadow-lg shadow-black/20"
              )
            : scrolled || mobileMenuOpen
              ? "bg-white/90 backdrop-blur-md text-soleares-black shadow-sm"
              : "bg-transparent text-white"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 group relative z-[110]"
            onClick={handleBrandNav}
          >
            <img
              src="/logos/logoMedusse.svg"
              alt="Medusse IoT"
              className="h-8 w-8 transition-transform group-hover:scale-110"
            />
            <span className="font-display text-lg font-bold tracking-widest uppercase">
              Medusse IoT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 relative z-[110]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchorNav(e, link.href)}
                className="relative text-sm font-medium text-white/80 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cinematic-accent after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative z-[110]">
            {isAuthenticated && user ? (
              <Link href="/dashboard" className={authLinkClass}>
                <User className="h-4 w-4" />
                {user.username}
              </Link>
            ) : (
              !isLoading && (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({
                      variant: isMarketing ? "default" : scrolled ? "default" : "outline",
                      size: "sm",
                    }),
                    "hidden sm:inline-flex"
                  )}
                >
                  Iniciar sesión
                </Link>
              )
            )}

            <button
              type="button"
              className="md:hidden text-white p-2 -mr-2 touch-manipulation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 touch-manipulation"
            aria-label="Cerrar menú"
            onClick={closeMobileMenu}
          />
          <nav
            className="absolute top-16 left-0 right-0 glass-header border-t border-white/10 max-h-[calc(100dvh-4rem)] overflow-y-auto shadow-2xl"
            aria-label="Menú móvil"
          >
            <div className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorNav(e, link.href)}
                  className="text-lg font-medium text-white py-4 px-2 border-b border-white/10 touch-manipulation active:bg-white/10 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href={isHomePage ? "#contacto" : "/#contacto"}
                onClick={(e) => handleAnchorNav(e, isHomePage ? "#contacto" : "/#contacto")}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full mt-4 touch-manipulation"
                )}
              >
                Contactar
              </Link>
              {isAuthenticated && user ? (
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full mt-2 inline-flex items-center justify-center gap-2 touch-manipulation"
                  )}
                >
                  <User className="h-4 w-4" />
                  {user.username}
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full mt-2 touch-manipulation"
                  )}
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
