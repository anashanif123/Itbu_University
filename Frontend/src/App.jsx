import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Landing from "./pages/Landing";

// Lazy load components for better performance
const ResultPage = lazy(() => import("./pages/ResultPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">
          {process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service in production
        if (process.env.NODE_ENV === 'production') {
          console.error('Application Error:', error, errorInfo);
        }
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            {/* 404 route */}
            <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <a href="/" className="text-blue-600 hover:text-blue-800">Go back home</a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
        <Analytics />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
