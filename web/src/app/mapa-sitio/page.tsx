import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function MapaSitioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Mapa del Sitio</h1>
          <p className="text-sm text-gray-600 mt-2">Navegación completa del proyecto Medusse IoT</p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Introducción */}
          <section className="pb-6 border-b">
            <p className="text-gray-700 leading-relaxed">
              Bienvenido al mapa del sitio de Medusse IoT. Aquí encontrarás todos los enlaces y secciones disponibles 
              del proyecto, organizados por categorías para facilitar tu navegación.
            </p>
          </section>

          {/* Páginas Principales */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">🏠</span>
              Páginas Principales
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Inicio</h3>
                <p className="text-sm text-gray-600">Página principal del proyecto con información general</p>
              </Link>
               <Link href="/login" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Iniciar Sesión</h3>
                <p className="text-sm text-gray-600">Acceso al sistema para usuarios registrados</p>
              </Link>
              <Link href="/capturas" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Capturas de Pantalla</h3>
                <p className="text-sm text-gray-600">Galería de imágenes de la aplicación móvil</p>
              </Link>
            </div>
          </section>

          {/* Área de Usuario */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">👤</span>
              Área de Usuario
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/dashboard" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Dashboard Principal</h3>
                <p className="text-sm text-gray-600">Panel de control personal del usuario</p>
              </Link>
               <Link href="/dashboard" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Perfil de Usuario</h3>
                <p className="text-sm text-gray-600">Ver y editar información personal (requiere autenticación)</p>
              </Link>
            </div>
          </section>

          {/* Administración */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">🛡️</span>
              Panel de Administración
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/admin" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Panel Admin</h3>
                <p className="text-sm text-gray-600">Gestión completa del sistema (solo administradores)</p>
              </Link>
               <Link href="/admin?tab=users" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-600">Crear, editar y eliminar usuarios (solo administradores)</p>
              </Link>
              <Link href="/admin?tab=stats" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Estadísticas del Sistema</h3>
                <p className="text-sm text-gray-600">Métricas y análisis del sistema (solo administradores)</p>
              </Link>
              <Link href="/admin?tab=logs" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Logs de Actividad</h3>
                <p className="text-sm text-gray-600">Registro de acciones del sistema (solo administradores)</p>
              </Link>
            </div>
          </section>

          {/* Visualización de Datos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">📊</span>
              Visualización de Datos
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Dashboard Grafana
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Visualización en tiempo real de datos de sensores</p>
              </a>
              <div className="block p-4 bg-gray-50 rounded-lg opacity-75">
                <h3 className="font-semibold text-gray-900 mb-1">Datos Históricos</h3>
                <p className="text-sm text-gray-600">Consulta de datos históricos de sensores</p>
              </div>
            </div>
          </section>

          {/* API y Servicios */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">🔌</span>
              API y Servicios
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="http://localhost:3001/health" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Estado de la API
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Verificar el estado de la API REST</p>
              </a>
               <a href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/api/README.md" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Documentación API
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Endpoints y documentación de la API en GitHub</p>
              </a>
            </div>
          </section>

          {/* Recursos del Proyecto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">📚</span>
              Recursos del Proyecto
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://github.com/Fralopala2/proyecto-medusse" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Repositorio GitHub
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Código fuente completo del proyecto</p>
              </a>
              <a href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/README.md" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Documentación README
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Guía de instalación y uso del proyecto</p>
              </a>
              <a href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/LICENSE" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Licencia del Proyecto
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Términos de la licencia Open Source</p>
              </a>
               <a href="https://github.com/Fralopala2/proyecto-medusse/blob/clase/documentacion/DOCUMENTACION_RETOS.md" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                  Documentación Técnica
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </h3>
                <p className="text-sm text-gray-600">Guías técnicas y arquitectura del sistema en GitHub</p>
              </a>
            </div>
          </section>

          {/* Tecnologías */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">⚙️</span>
              Tecnologías Utilizadas
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Frontend Web</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Next.js 15</li>
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Node.js + Express</li>
                  <li>• MySQL 8.0</li>
                  <li>• InfluxDB 2</li>
                  <li>• MQTT Mosquitto</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">IoT & Mobile</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• ESP32 Arduino</li>
                  <li>• Flutter (App móvil)</li>
                  <li>• Grafana</li>
                  <li>• Docker Compose</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Información Legal */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">⚖️</span>
              Información Legal
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/aviso-legal" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Aviso Legal</h3>
                <p className="text-sm text-gray-600">Términos y condiciones de uso</p>
              </Link>
              <Link href="/politica-privacidad" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:shadow transition-all">
                <h3 className="font-semibold text-gray-900 mb-1">Política de Privacidad</h3>
                <p className="text-sm text-gray-600">Protección de datos personales</p>
              </Link>
              <Link href="/mapa-sitio" className="block p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <h3 className="font-semibold text-gray-900 mb-1">Mapa del Sitio</h3>
                <p className="text-sm text-gray-600">Estás aquí</p>
              </Link>
            </div>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-3">📧</span>
              Contacto e Información
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Autor del Proyecto</h3>
                  <p className="text-gray-700">Francisco Manuel López Alarte</p>
                  <p className="text-sm text-gray-600 mt-1">Ciclo Formativo de Grado Superior</p>
                  <p className="text-sm text-gray-600">Desarrollo de Aplicaciones Multiplataforma</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Información de Contacto</h3>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>GitHub:</strong> <a href="https://github.com/Fralopala2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">@Fralopala2</a>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Institución:</strong> IES José Rodrigo Botet
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Nota final */}
          <section className="pt-6 border-t">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Proyecto Educativo:</strong> Medusse IoT es un proyecto académico desarrollado con fines educativos 
                    y demostrativos. Algunas funcionalidades pueden requerir autenticación o estar en desarrollo.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

       <Footer />
    </div>
  );
}
