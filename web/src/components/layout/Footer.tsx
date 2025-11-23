import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-soleares-black text-white py-12 snap-start">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Soluciones
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Precios
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Tecnología
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contacto
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Descargas PDF
            </Link>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Términos
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-xs text-gray-500">
          © Soleares 2025. Todos los derechos reservados. | info@soleares.eu
        </div>
      </div>
    </footer>
  );
}
