import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));


function App() {
  return (
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
              <Dashboard />
            </Suspense>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
