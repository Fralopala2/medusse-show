'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticacion
    const token = localStorage.getItem('sessionToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    // Validar token con el servidor
    fetch('http://localhost:3001/api/auth/validate', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user);
        } else {
          // Token invalido, redirigir a login
          localStorage.removeItem('sessionToken');
          localStorage.removeItem('user');
          router.push('/login');
        }
      })
      .catch(err => {
        console.error('Error validating session:', err);
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('sessionToken');
    
    if (token) {
      try {
        await fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }

    // Limpiar localStorage
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    
    // Redirigir a login
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/logos/logoMedusse.svg" 
                alt="Medusse IoT" 
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Medusse IoT</h1>
                <p className="text-sm text-gray-600">Bienvenido, {user.fullName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info del usuario */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Informacion del Usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Usuario</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nombre completo</p>
              <p className="font-medium">{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rol</p>
              <p className="font-medium">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'user' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role.toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Acciones rapidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-2">Dashboard Grafana</h3>
            <p className="text-sm text-gray-600">Ver visualizaciones en tiempo real</p>
          </a>

          <a
            href="http://localhost:3001/health"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">🔌</div>
            <h3 className="text-lg font-semibold mb-2">API REST</h3>
            <p className="text-sm text-gray-600">Estado de la API</p>
          </a>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-lg font-semibold mb-2">Sensores Activos</h3>
            <p className="text-sm text-gray-600">18 tipos de sensores</p>
          </div>
        </div>

        {/* Panel de admin (solo para admins) */}
        {user.role === 'admin' && (
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin')}
              className="w-full bg-indigo-600 text-white rounded-lg shadow p-6 hover:bg-indigo-700 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl mb-2">🛡️</div>
                  <h3 className="text-lg font-semibold mb-2">Panel de Administracion</h3>
                  <p className="text-sm text-indigo-100">Gestionar usuarios, ver estadisticas y logs del sistema</p>
                </div>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* Permisos segun rol */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Permisos de tu Rol</h2>
          <div className="space-y-2">
            {user.role === 'admin' && (
              <>
                <div className="flex items-center text-green-600">
                  <span className="mr-2">✓</span>
                  <span>Acceso completo al sistema</span>
                </div>
                <div className="flex items-center text-green-600">
                  <span className="mr-2">✓</span>
                  <span>Gestion de usuarios</span>
                </div>
                <div className="flex items-center text-green-600">
                  <span className="mr-2">✓</span>
                  <span>Configuracion del sistema</span>
                </div>
              </>
            )}
            {user.role === 'user' && (
              <>
                <div className="flex items-center text-blue-600">
                  <span className="mr-2">✓</span>
                  <span>Ver datos de sensores</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <span className="mr-2">✓</span>
                  <span>Crear alertas</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  <span>Gestion de usuarios (solo admin)</span>
                </div>
              </>
            )}
            {user.role === 'viewer' && (
              <>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span>
                  <span>Ver datos de sensores (solo lectura)</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  <span>Crear alertas (solo user/admin)</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">✗</span>
                  <span>Gestion de usuarios (solo admin)</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
