// Utilidades de validacion para formularios
// Sin dependencias externas - codigo minimo

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validacion de usuario
export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return { isValid: false, error: 'El usuario es requerido' };
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'El usuario debe tener al menos 3 caracteres' };
  }
  
  if (username.length > 50) {
    return { isValid: false, error: 'El usuario no puede tener mas de 50 caracteres' };
  }
  
  // Solo letras, numeros y guion bajo
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, error: 'El usuario solo puede contener letras, numeros y guion bajo' };
  }
  
  return { isValid: true };
}

// Validacion de contrasena
export function validatePassword(password: string): ValidationResult {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'La contrasena es requerida' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'La contrasena debe tener al menos 6 caracteres' };
  }
  
  if (password.length > 100) {
    return { isValid: false, error: 'La contrasena no puede tener mas de 100 caracteres' };
  }
  
  return { isValid: true };
}

// Validacion de email
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'El email es requerido' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'El email no es valido' };
  }
  
  return { isValid: true };
}

// Validacion de nombre completo
export function validateFullName(name: string): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'El nombre es requerido' };
  }
  
  if (name.length < 3) {
    return { isValid: false, error: 'El nombre debe tener al menos 3 caracteres' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'El nombre no puede tener mas de 100 caracteres' };
  }
  
  return { isValid: true };
}
