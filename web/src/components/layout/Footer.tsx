import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-soleares-black text-white py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="text-gray-500">
            © Pacoaldev 2025. Todos los derechos reservados. | pacoaldev@gmail.com
          </div>
          <div className="flex gap-6">
            <Link 
              href="/aviso-legal"
              className="hover:text-white transition-colors"
            >
              Aviso Legal
            </Link>
            <Link 
              href="/politica-privacidad"
              className="hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link 
              href="/mapa-sitio"
              className="hover:text-white transition-colors"
            >
              Mapa del Sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
