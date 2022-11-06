import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import ProtectedRoute from './utils/protected-route';
import { AuthProvider } from './context/authContext';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));


function App() {


  return (
    <AuthProvider >
      <Router>
        <Routes>
          <Route
            path={'/login'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path={'/'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute >
                  <Dashboard />
                </ProtectedRoute>

              </Suspense>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
