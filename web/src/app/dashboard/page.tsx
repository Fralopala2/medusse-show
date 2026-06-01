'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getApiBaseUrl } from '@/lib/api';
import { notifyAuthChange } from '@/hooks/use-auth';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

interface Location {
  id: number;
  name: string;
  display_name: string;
}

interface Sensor {
  id: number;
  sensor_type: string;
  display_name: string;
  unit: string;
}

interface OperationalAlert {
  id: number;
  location_name: string;
  sensor_name: string;
  alert_type: string;
  message: string;
  value: number | null;
  threshold: number | null;
  is_resolved: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [creatingAlert, setCreatingAlert] = useState(false);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState<OperationalAlert[]>([]);
  const [alertNotice, setAlertNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadRecentAlerts = async (token: string) => {
    setLoadingAlerts(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRecentAlerts((data.alerts || []).slice(0, 10));
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoadingAlerts(false);
    }
  };

  useEffect(() => {
    // Verificar autenticacion
    const token = localStorage.getItem('sessionToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    // Validar token con el servidor
    fetch(`${getApiBaseUrl()}/api/auth/validate`, {
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

  useEffect(() => {
    if (!user || user.role === 'viewer') return;

    const token = localStorage.getItem('sessionToken');
    if (!token) return;

    const loadAlertOptions = async () => {
      try {
        const [locationsRes, sensorsRes] = await Promise.all([
          fetch(`${getApiBaseUrl()}/api/admin/locations`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${getApiBaseUrl()}/api/admin/sensors`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        const locationsData = await locationsRes.json();
        const sensorsData = await sensorsRes.json();

        if (locationsRes.ok && locationsData.success) {
          setLocations(locationsData.locations || []);
        }

        if (sensorsRes.ok && sensorsData.success) {
          setSensors(sensorsData.sensors || []);
        }
      } catch (error) {
        console.error('Error loading alert options:', error);
      }
    };

    loadAlertOptions();
    loadRecentAlerts(token);
  }, [user]);

  const handleCreateAlert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      setAlertNotice({ type: 'error', message: 'Tu sesión ha caducado. Vuelve a iniciar sesión.' });
      return;
    }

    const formData = new FormData(form);

    setCreatingAlert(true);
    setAlertNotice(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/alerts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_id: formData.get('location_id'),
          sensor_id: formData.get('sensor_id'),
          alert_type: formData.get('alert_type'),
          message: formData.get('message'),
          value: formData.get('value') || null,
          threshold: formData.get('threshold') || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setAlertNotice({
          type: 'success',
          message:
            'Alerta guardada en el sistema (MySQL). Se muestra abajo y en Panel Admin → Alertas. Grafana solo muestra gráficos de sensores, no estas alertas manuales.',
        });
        form.reset();
        await loadRecentAlerts(token);
      } else {
        setAlertNotice({ type: 'error', message: data.message || 'Error al crear la alerta.' });
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      setAlertNotice({ type: 'error', message: 'Error al crear la alerta.' });
    } finally {
      setCreatingAlert(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('sessionToken');
    
    if (token) {
      try {
        await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
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
    notifyAuthChange();

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

  const grafanaUrl = typeof window !== 'undefined' ? `http://${window.location.hostname}:4000` : 'http://localhost:4000';

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Medusse IoT</h1>
                <p className="text-xs sm:text-sm text-gray-600">Bienvenido, {user.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                Ir al inicio
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 hover:scale-105"
              >
                Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info del usuario */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informacion del Usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Usuario</p>
              <p className="font-medium text-gray-900">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nombre completo</p>
              <p className="font-medium text-gray-900">{user.fullName}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <a
            href={grafanaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Grafana</h3>
            <p className="text-sm text-gray-600">Gráficos de sensores en tiempo real (InfluxDB). No incluye alertas creadas aquí.</p>
          </a>

          <a
            href={`${getApiBaseUrl()}/health`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">🔌</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API REST</h3>
            <p className="text-sm text-gray-600">Estado de la API</p>
          </a>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sensores Activos</h3>
            <p className="text-sm text-gray-600">18 tipos de sensores</p>
          </div>
        </div>

        {(user.role === 'admin' || user.role === 'user') && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Crear alerta</h2>
                <p className="text-sm text-gray-600">
                  {user.role === 'admin'
                    ? 'Registro operativo en base de datos (no en Grafana). Gestión completa en Panel Admin → Alertas.'
                    : 'Registro operativo en base de datos. Las verás en la lista inferior tras crearlas.'}
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Disponible para {user.role === 'admin' ? 'admin' : 'user'}
              </span>
            </div>

            {alertNotice && (
              <div className={`mb-4 rounded-md px-4 py-3 text-sm ${
                alertNotice.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {alertNotice.message}
              </div>
            )}

            <form onSubmit={handleCreateAlert} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <select
                  name="location_id"
                  required
                  disabled={locations.length === 0}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                >
                  <option value="">Seleccionar ubicación</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.display_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor</label>
                <select
                  name="sensor_id"
                  required
                  disabled={sensors.length === 0}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                >
                  <option value="">Seleccionar sensor</option>
                  {sensors.map((sensor) => (
                    <option key={sensor.id} value={sensor.id}>
                      {sensor.display_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de alerta</label>
                <select
                  name="alert_type"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="info">Información</option>
                  <option value="warning">Advertencia</option>
                  <option value="danger">Peligro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  name="value"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Opcional"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe la alerta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Umbral</label>
                <input
                  type="number"
                  step="0.01"
                  name="threshold"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Opcional"
                />
              </div>

              <div className="flex items-end gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={creatingAlert || locations.length === 0 || sensors.length === 0}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {creatingAlert ? 'Creando...' : 'Crear alerta'}
                </button>
                <p className="text-xs text-gray-500">
                  Si no ves ubicaciones o sensores, revisa que la sesión siga activa.
                </p>
              </div>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Alertas registradas</h3>
                {user.role === 'admin' && (
                  <Link
                    href="/admin?tab=alerts"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Gestionar todas en Panel Admin →
                  </Link>
                )}
              </div>
              {loadingAlerts ? (
                <p className="text-sm text-gray-500">Cargando alertas...</p>
              ) : recentAlerts.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Aún no hay alertas. Al crear una aparecerá aquí (no en Grafana).
                </p>
              ) : (
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Fecha</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Ubicación</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Sensor</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Tipo</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Mensaje</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-600">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {recentAlerts.map((alert) => (
                        <tr key={alert.id}>
                          <td className="whitespace-nowrap px-3 py-2 text-gray-700">
                            {new Date(alert.created_at).toLocaleString('es-ES')}
                          </td>
                          <td className="px-3 py-2 text-gray-900">{alert.location_name}</td>
                          <td className="px-3 py-2 text-gray-900">{alert.sensor_name}</td>
                          <td className="px-3 py-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                alert.alert_type === 'danger'
                                  ? 'bg-red-100 text-red-800'
                                  : alert.alert_type === 'warning'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {alert.alert_type}
                            </span>
                          </td>
                          <td className="max-w-xs truncate px-3 py-2 text-gray-700" title={alert.message}>
                            {alert.message}
                          </td>
                          <td className="px-3 py-2">
                            {alert.is_resolved ? (
                              <span className="text-xs text-green-700">Resuelta</span>
                            ) : (
                              <span className="text-xs font-medium text-red-700">Activa</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Permisos de tu Rol</h2>
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
                  <span>Gestionar usuarios (solo admin)</span>
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
