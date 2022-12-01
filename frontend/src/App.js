import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import ProtectedRoute from './utils/protected-route';
import { AuthProvider } from './context/authContext';
import DocsList from './pages/listDocSpec';
import DocAppointment from './pages/docAppointment';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const AppointmentPage = lazy(() => import('./pages/appointment'));


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

          <Route
            path={'/appointment'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute >
                  <AppointmentPage />
                </ProtectedRoute>

              </Suspense>
            }
          />

          <Route
            path={'/doctors/:specialization'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute >
                  <DocsList />
                </ProtectedRoute>

              </Suspense>
            }
          />

          <Route
            path={'/appointment/d/:id'}
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <ProtectedRoute >
                  <DocAppointment />
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
