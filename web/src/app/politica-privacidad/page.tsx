import Link from "next/link";

export default function PoliticaPrivacidadPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
          <p className="text-sm text-gray-600 mt-2">Última actualización: 7 de diciembre de 2025</p>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introducción</h2>
            <p className="text-gray-700 leading-relaxed">
              En Medusse IoT, respetamos su privacidad y estamos comprometidos con la protección de sus datos personales. 
              Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos su información personal 
              cuando utiliza nuestro sitio web y servicios.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Este proyecto es de carácter educativo y cumple con el Reglamento General de Protección de Datos (RGPD) 
              de la Unión Europea y la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD) española.
            </p>
          </section>

          {/* Responsable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Responsable del Tratamiento</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-700">
              <p><strong>Responsable:</strong> Francisco Manuel López Alarte</p>
              <p><strong>Correo electrónico:</strong> <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a></p>
              <p><strong>Institución:</strong> IES José Rodrigo Botet</p>
              <p><strong>Finalidad:</strong> Proyecto educativo - Sistema de Monitoreo Ambiental IoT</p>
            </div>
          </section>

          {/* Datos recopilados */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Datos Personales Recopilados</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              En Medusse IoT recopilamos los siguientes datos personales:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1. Datos de Registro de Usuario</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Nombre de usuario</li>
              <li>Correo electrónico</li>
              <li>Nombre completo</li>
              <li>Contraseña (almacenada de forma cifrada con bcrypt)</li>
              <li>Rol de usuario (admin, profesor, alumno)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2. Datos de Uso y Navegación</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Dirección IP</li>
              <li>Información del navegador (User Agent)</li>
              <li>Fecha y hora de acceso</li>
              <li>Páginas visitadas</li>
              <li>Preferencias de usuario (tema, idioma, zona horaria)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3. Datos de Sesión</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Token de sesión</li>
              <li>Tiempo de sesión</li>
              <li>Última fecha de inicio de sesión</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.4. Datos de Actividad</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Registro de acciones realizadas en el sistema</li>
              <li>Alertas creadas y resueltas</li>
              <li>Cambios en configuración</li>
            </ul>
          </section>

          {/* Finalidad */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Finalidad del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Los datos personales recopilados son utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Gestión de usuarios:</strong> Crear y administrar cuentas de usuario, autenticación y autorización.</li>
              <li><strong>Funcionamiento del servicio:</strong> Proporcionar acceso a dashboards, visualizaciones y datos de sensores.</li>
              <li><strong>Seguridad:</strong> Proteger el sistema contra accesos no autorizados y mantener logs de auditoría.</li>
              <li><strong>Mejora del servicio:</strong> Analizar el uso del sistema para mejorar funcionalidades (uso educativo).</li>
              <li><strong>Comunicación:</strong> Enviar notificaciones relacionadas con el sistema (alertas, actualizaciones).</li>
              <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y normativas aplicables.</li>
            </ul>
          </section>

          {/* Base legal */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base Legal del Tratamiento</h2>
            <p className="text-gray-700 leading-relaxed">
              El tratamiento de sus datos personales se basa en:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li><strong>Consentimiento:</strong> Al registrarse y usar el servicio, usted consiente el tratamiento de sus datos.</li>
              <li><strong>Ejecución de un contrato:</strong> Necesario para proporcionar los servicios solicitados.</li>
              <li><strong>Interés legítimo:</strong> Mejorar la seguridad y funcionalidad del sistema educativo.</li>
              <li><strong>Obligación legal:</strong> Cumplimiento de normativas de protección de datos y educativas.</li>
            </ul>
          </section>

          {/* Conservación */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Conservación de Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Los datos personales se conservarán durante:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li><strong>Datos de usuario:</strong> Mientras la cuenta esté activa o sea necesario para proporcionar el servicio.</li>
              <li><strong>Logs de actividad:</strong> 30 días (configurable según necesidades educativas).</li>
              <li><strong>Sesiones:</strong> 24 horas desde el último acceso.</li>
              <li><strong>Datos históricos:</strong> Según sea necesario para fines educativos y demostrativos del proyecto.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Una vez finalizado el periodo de conservación, los datos serán eliminados de forma segura.
            </p>
          </section>

          {/* Destinatarios */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Destinatarios de los Datos</h2>
            <p className="text-gray-700 leading-relaxed">
              Sus datos personales no serán compartidos con terceros, excepto:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li><strong>Servicios de infraestructura:</strong> Los datos se almacenan en servidores locales o en servicios cloud utilizados 
              para el desarrollo del proyecto (según configuración).</li>
              <li><strong>Obligaciones legales:</strong> Cuando sea requerido por autoridades competentes.</li>
              <li><strong>Evaluación académica:</strong> Los profesores responsables del proyecto pueden acceder a los datos para evaluación educativa.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo.
            </p>
          </section>

          {/* Derechos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Derechos del Usuario</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Conforme al RGPD, usted tiene los siguientes derechos:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Derecho de acceso:</strong> Obtener confirmación sobre si estamos tratando sus datos personales.</li>
              <li><strong>Derecho de rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de sus datos personales (&quot;derecho al olvido&quot;).</li>
              <li><strong>Derecho de limitación:</strong> Solicitar la limitación del tratamiento de sus datos.</li>
              <li><strong>Derecho de portabilidad:</strong> Recibir sus datos en formato estructurado y de uso común.</li>
              <li><strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos personales.</li>
              <li><strong>Derecho a retirar el consentimiento:</strong> En cualquier momento, sin afectar a la licitud del tratamiento previo.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Para ejercer estos derechos, puede contactar a través de <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) 
              si considera que el tratamiento de sus datos no cumple con la normativa.
            </p>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Medidas de Seguridad</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li>Cifrado de contraseñas con bcrypt</li>
              <li>Autenticación mediante tokens seguros (JWT/UUID)</li>
              <li>Conexiones HTTPS en producción</li>
              <li>Control de acceso basado en roles (RBAC)</li>
              <li>Logs de auditoría de actividades</li>
              <li>Copias de seguridad periódicas</li>
              <li>Actualizaciones regulares de seguridad</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-700 leading-relaxed">
              Este sitio web utiliza tecnologías de almacenamiento local:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li><strong>LocalStorage:</strong> Para almacenar tokens de sesión y preferencias de usuario.</li>
              <li><strong>SessionStorage:</strong> Para datos temporales de la sesión actual.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Estos datos se almacenan en su navegador y pueden ser eliminados en cualquier momento desde la configuración 
              del navegador.
            </p>
          </section>

          {/* Menores */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Menores de Edad</h2>
            <p className="text-gray-700 leading-relaxed">
              Este servicio está destinado a un entorno educativo. Los menores de 14 años deben contar con el consentimiento 
              de sus padres o tutores legales para el tratamiento de sus datos personales, conforme a la LOPDGDD.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              En el contexto educativo del IES José Rodrigo Botet, el centro educativo actúa como responsable del tratamiento 
              de datos de los alumnos menores de edad.
            </p>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modificaciones de la Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán 
              efectivos inmediatamente tras su publicación en el sitio web. Se recomienda revisar periódicamente esta página.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              La fecha de última actualización se indica en la parte superior de este documento.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Para cualquier consulta, solicitud o reclamación relacionada con la protección de datos, puede contactar con el 
              responsable del tratamiento:
            </p>
            <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:pacoaldev@gmail.com" className="text-indigo-600 hover:text-indigo-700">pacoaldev@gmail.com</a></p>
              <p className="text-gray-700"><strong>Proyecto:</strong> Medusse IoT - Sistema de Monitoreo Ambiental</p>
              <p className="text-gray-700"><strong>Institución:</strong> IES José Rodrigo Botet</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 Medusse IoT - Francisco Manuel López Alarte</p>
            <div className="flex gap-6">
              <Link href="/aviso-legal" className="hover:text-indigo-600">Aviso Legal</Link>
              <Link href="/politica-privacidad" className="hover:text-indigo-600">Privacidad</Link>
              <Link href="/mapa-sitio" className="hover:text-indigo-600">Mapa del Sitio</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
