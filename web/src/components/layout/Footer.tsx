import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-soleares-black text-white py-12 snap-start">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#soluciones" className="hover:text-white transition-colors">
              Soluciones
            </Link>
            <Link href="#precios" className="hover:text-white transition-colors">
              Precios
            </Link>
            <Link href="#tecnologia" className="hover:text-white transition-colors">
              Tecnología
            </Link>
            <Link href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </Link>
            <Link 
              href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/README.md" 
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Descargas PDF
            </Link>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link 
              href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/LICENSE" 
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link 
              href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/LICENSE" 
              target="_blank"
              className="hover:text-white transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-xs text-gray-500">
          © Pacoaldev 2025. Todos los derechos reservados. | pacoaldev@gmail.com
        </div>
      </div>
    </footer>
  );
}
