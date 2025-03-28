// src/auth.js
export const isAuthenticated = () => {
    try {
      const token = localStorage.getItem('token');
      
      // Verificación básica del token (puedes hacerla más robusta)
      if (!token || token === 'undefined' || token === 'null') {
        return false;
      }
      
      // Opcional: Verificar expiración si tu token es JWT
      if (token.split('.').length === 3) { // Es un JWT?
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp < Date.now() / 1000) {
          localStorage.removeItem('token'); // Elimina token expirado
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  };