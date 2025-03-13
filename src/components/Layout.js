import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="error-container">
      <h2>Algo salió mal</h2>
      <p>{error.message}</p>
    </div>
  );
}

function Loading() {
  return <div className="loading-spinner">Cargando...</div>;
}

function Layout({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout; 