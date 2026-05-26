"use client";

import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const scrolled = useScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isMarketing =
    pathname === "/" || pathname === "/capturas";

  const navLinks = [
    { name: "Dashboard", href: isHomePage ? "#dashboard" : "/#dashboard" },
    { name: "Soluciones", href: isHomePage ? "#soluciones" : "/#soluciones" },
    { name: "Tecnología", href: isHomePage ? "#tecnologia" : "/#tecnologia" },
    { name: "Precios", href: isHomePage ? "#precios" : "/#precios" },
    { name: "Contacto", href: isHomePage ? "#contacto" : "/#contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
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
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logos/logoMedusse.svg"
            alt="Medusse IoT"
            className="h-8 w-8 transition-transform group-hover:scale-110"
          />
          <span className="font-display text-lg font-bold tracking-widest uppercase">
            Medusse IoT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-white/80 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cinematic-accent after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant={isMarketing ? "default" : scrolled ? "default" : "outline"}
              size="sm"
              className="hidden sm:flex"
            >
              Iniciar sesión
            </Button>
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full glass-header border-t border-white/10 md:hidden min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/90 py-3 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/#contacto" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-4" variant="outline">
                Contactar
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2">Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
