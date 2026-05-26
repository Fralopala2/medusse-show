'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateUsername, validatePassword } from '@/lib/validation';
import { getApiBaseUrl } from '@/lib/api';
import { notifyAuthChange } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Errores de validacion en tiempo real
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });

  // Validar en tiempo real
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (touched.username) {
      const validation = validateUsername(value);
      setUsernameError(validation.isValid ? '' : validation.error || '');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const validation = validatePassword(value);
      setPasswordError(validation.isValid ? '' : validation.error || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Marcar todos como tocados
    setTouched({ username: true, password: true });
    
    // Validar antes de enviar
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    
    if (!usernameValidation.isValid) {
      setUsernameError(usernameValidation.error || '');
      return;
    }
    
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || '');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Guardar token en localStorage
        localStorage.setItem('sessionToken', data.sessionToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        notifyAuthChange();

        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        setError(data.message || 'Credenciales invalidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-xl shadow-2xl">
        {/* Logo y titulo */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/logos/logoMedusse.svg" 
              alt="Medusse IoT Logo" 
              className="h-32 w-32"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Medusse IoT</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Sistema de Monitoreo Ambiental
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                onBlur={() => setTouched({ ...touched, username: true })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  usernameError 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="admin, paco, profesor, alumno"
              />
              {usernameError && (
                <p className="mt-1 text-sm text-red-600">{usernameError}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  passwordError 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="medusse2025"
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading || !!usernameError || !!passwordError}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? 'Iniciando sesion...' : 'Iniciar sesion'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Volver a la pagina principal
            </button>
          </div>
        </form>

        {/* Info de usuarios */}
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p className="font-semibold mb-2">Usuarios de prueba:</p>
          <div className="space-y-1 text-xs">
            <p>admin / paco (admin)</p>
            <p>profesor (user) / alumno (viewer)</p>
            <p className="mt-2 font-medium">Password: medusse2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
