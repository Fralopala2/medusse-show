import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Aviso Legal</h1>
          <p className="text-sm text-gray-600 mt-2">Última actualización: 7 de diciembre de 2025</p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Identificación */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Identificación del Titular</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Titular:</strong> Francisco Manuel López Alarte</p>
              <p><strong>Proyecto:</strong> Medusse IoT - Sistema de Monitoreo Ambiental</p>
              <p><strong>Institución:</strong> IES José Rodrigo Botet</p>
              <p><strong>Correo electrónico:</strong> <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a></p>
              <p><strong>Repositorio:</strong> <a href="https://github.com/Fralopala2/medusse-show" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">github.com/Fralopala2/medusse-show</a></p>
            </div>
          </section>

          {/* Objeto del sitio web */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objeto del Sitio Web</h2>
            <p className="text-gray-700 leading-relaxed">
              Medusse IoT es un proyecto educativo desarrollado como trabajo de fin de ciclo del Ciclo Formativo de Grado Superior 
              en Desarrollo de Aplicaciones Multiplataforma. El sitio web tiene como objetivo presentar un sistema de monitoreo 
              ambiental en tiempo real que integra sensores IoT, visualización de datos y gestión de usuarios.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Este proyecto es de carácter educativo y demostrativo, diseñado para mostrar la integración de tecnologías modernas 
              como IoT, bases de datos, APIs REST, y aplicaciones web y móviles.
            </p>
          </section>

          {/* Propiedad intelectual */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propiedad Intelectual e Industrial</h2>
            <p className="text-gray-700 leading-relaxed">
              El código fuente de Medusse IoT está publicado bajo licencia de código abierto (Open Source) en el repositorio de GitHub. 
              Los derechos de autor del proyecto pertenecen a Francisco Manuel López Alarte.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Todos los contenidos del sitio web, incluyendo pero no limitándose a textos, gráficos, logotipos, iconos, imágenes, 
              código fuente, y documentación, están protegidos por las leyes de propiedad intelectual e industrial aplicables.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              El proyecto utiliza tecnologías y librerías de terceros con sus respectivas licencias:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
              <li>React y Next.js (MIT License)</li>
              <li>Node.js y Express (MIT License)</li>
              <li>Flutter (BSD License)</li>
              <li>InfluxDB, Grafana, y MQTT (licencias respectivas)</li>
              <li>Arduino y ESP32 (licencias Open Source)</li>
            </ul>
          </section>

          {/* Uso del sitio web */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Condiciones de Uso</h2>
            <p className="text-gray-700 leading-relaxed">
              El acceso y uso de este sitio web está sujeto a las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2 ml-4">
              <li>El sitio web es de carácter educativo y demostrativo.</li>
              <li>Los usuarios deben utilizar el sitio de forma lícita y conforme a la legislación vigente.</li>
              <li>Está prohibido el uso del sitio para fines comerciales sin autorización previa.</li>
              <li>No se permite la reproducción, distribución o modificación de los contenidos sin consentimiento.</li>
              <li>Los datos de sensores mostrados son simulados o reales en un entorno educativo controlado.</li>
            </ul>
          </section>

          {/* Limitación de responsabilidad */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 leading-relaxed">
              El titular del sitio web no se hace responsable de:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2 ml-4">
              <li>La disponibilidad continua del servicio, dado su carácter educativo y experimental.</li>
              <li>Errores o inexactitudes en los contenidos publicados.</li>
              <li>Daños o perjuicios derivados del uso o imposibilidad de uso del sitio web.</li>
              <li>El contenido de sitios web de terceros enlazados desde este sitio.</li>
              <li>Virus informáticos o elementos dañinos que pudieran afectar al sistema informático del usuario.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Este proyecto se proporciona &quot;tal cual&quot; sin garantías de ningún tipo, expresas o implícitas.
            </p>
          </section>

          {/* Enlaces externos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Enlaces a Terceros</h2>
            <p className="text-gray-700 leading-relaxed">
              El sitio web puede contener enlaces a sitios web de terceros (GitHub, servicios cloud, documentación de librerías, etc.). 
              El titular no tiene control sobre estos sitios y no asume ninguna responsabilidad por sus contenidos, políticas de 
              privacidad o prácticas.
            </p>
          </section>

          {/* Protección de datos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Protección de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Para información sobre cómo tratamos los datos personales de los usuarios, consulte nuestra 
              <Link href="/politica-privacidad" className="text-indigo-600 hover:text-indigo-700 font-medium"> Política de Privacidad</Link>.
            </p>
          </section>

          {/* Legislación aplicable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Legislación Aplicable y Jurisdicción</h2>
            <p className="text-gray-700 leading-relaxed">
              El presente aviso legal se rige por la legislación española. Para cualquier controversia que pudiera derivarse 
              del acceso o uso del sitio web, las partes se someten a los juzgados y tribunales de Valencia, España.
            </p>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones</h2>
            <p className="text-gray-700 leading-relaxed">
              El titular se reserva el derecho de modificar el presente aviso legal en cualquier momento. Los cambios serán 
              efectivos desde su publicación en el sitio web. Se recomienda revisar periódicamente este documento.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contacto</h2>
            <p className="text-gray-700 leading-relaxed">
              Para cualquier consulta relacionada con este aviso legal, puede contactar a través de:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a></p>
              <p className="text-gray-700 mt-1"><strong>GitHub:</strong> <a href="https://github.com/Fralopala2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">@Fralopala2</a></p>
            </div>
          </section>

        </div>
      </main>

       <Footer />
    </div>
  );
}
